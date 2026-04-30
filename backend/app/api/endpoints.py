"""API endpoints — reads all data from MongoDB collections."""

from asyncio import Lock
from collections import defaultdict
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, Request, status, BackgroundTasks

import smtplib
import logging
from email.message import EmailMessage

from ..core.config import Settings, get_settings
from ..core.database import get_database
from ..models.schemas import (
    ContactMessage,
    ContactMessageCreate,
    ContactResponse,
    Experience,
    PersonalInfo,
    Project,
    Skill,
)

router = APIRouter()

RATE_LIMIT_STATE: dict[str, list[datetime]] = defaultdict(list)
RATE_LIMIT_LOCK = Lock()


async def _enforce_contact_rate_limit(request: Request, settings: Settings) -> None:
    forwarded_for = request.headers.get("x-forwarded-for")
    client_ip = (forwarded_for.split(",")[0].strip() if forwarded_for else None) or (
        request.client.host if request.client else "anonymous"
    )
    now = datetime.now(timezone.utc)
    window_start = now - timedelta(seconds=settings.contact_rate_limit_window_seconds)

    async with RATE_LIMIT_LOCK:
        entries = [stamp for stamp in RATE_LIMIT_STATE[client_ip] if stamp >= window_start]
        if len(entries) >= settings.contact_rate_limit_max_requests:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Too many contact requests. Please try again later.",
            )
        entries.append(now)
        RATE_LIMIT_STATE[client_ip] = entries


@router.get("/profile", response_model=PersonalInfo)
async def get_profile(database=Depends(get_database)) -> PersonalInfo:
    """Return personal info from the profile collection."""
    doc = await database.profile.find_one({}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Profile not found")
    return PersonalInfo(**doc)


@router.get("/experience", response_model=list[Experience])
async def get_experience(
    tech: str | None = None, database=Depends(get_database)
) -> list[Experience]:
    """Return experiences, optionally filtered by technology."""
    query: dict = {}
    if tech:
        query["technologies"] = {"$regex": tech, "$options": "i"}

    cursor = database.experiences.find(query, {"_id": 0})
    docs = await cursor.to_list(length=100)
    return [Experience(**doc) for doc in docs]


@router.get("/skills", response_model=list[Skill])
async def get_skills(database=Depends(get_database)) -> list[Skill]:
    """Return all skill categories from the skills collection."""
    cursor = database.skills.find({}, {"_id": 0})
    docs = await cursor.to_list(length=100)
    return [Skill(**doc) for doc in docs]


@router.get("/projects", response_model=list[Project])
async def get_projects(database=Depends(get_database)) -> list[Project]:
    """Return all projects from the projects collection."""
    cursor = database.projects.find({}, {"_id": 0})
    docs = await cursor.to_list(length=100)
    return [Project(**doc) for doc in docs]


logger = logging.getLogger(__name__)

def send_email_notification(name: str, sender_email: str, content: str, settings):
    """Función síncrona para enviar el correo."""
    if not settings.smtp_user or not settings.smtp_password:
        logger.warning("No se enviará correo: SMTP credentials no configuradas.")
        return

    msg = EmailMessage()
    msg['Subject'] = f"🚀 Nuevo contacto en Portafolio: {name}"
    msg['From'] = settings.smtp_user
    msg['To'] = settings.smtp_user # Te lo envías a ti mismo

    msg.set_content(f"""
    ¡Hola Javier! Tienes un nuevo mensaje en tu portafolio.

    Datos del contacto:
    -------------------
    Nombre: {name}
    Email: {sender_email}

    Mensaje:
    --------
    {content}
    """)

    try:
        # Usando el servidor SMTP de Gmail
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(settings.smtp_user, settings.smtp_password)
            smtp.send_message(msg)
            logger.info("Correo de notificación enviado con éxito.")
    except Exception as e:
        logger.error(f"Error al enviar el correo: {e}")


@router.post("/contact", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
async def submit_contact(
    payload: ContactMessageCreate,
    request: Request,
    background_tasks: BackgroundTasks,  # <-- 1. Inyectamos BackgroundTasks
    database=Depends(get_database),
    settings: Settings = Depends(get_settings),
) -> ContactResponse:
    """Persist a contact message in MongoDB and send an email notification."""
    await _enforce_contact_rate_limit(request, settings)

    message = ContactMessage(
        **payload.model_dump(),
        created_at=datetime.now(timezone.utc),
    )
    # Guardamos en la base de datos
    await database.contact_messages.insert_one(message.model_dump())

    # 2. Programamos el correo para que se envíe en segundo plano
    send_email_notification(
        name=payload.name,
        sender_email=payload.email,
        content=payload.content,
        settings=settings
    )

    # 3. Respondemos al frontend inmediatamente, sin hacerle esperar por el email
    return ContactResponse(status="success")

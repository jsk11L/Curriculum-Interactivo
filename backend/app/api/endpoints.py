"""API endpoints — reads all data from MongoDB collections."""

from asyncio import Lock
from collections import defaultdict
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, Request, status, BackgroundTasks

import logging
import smtplib
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
    logger.info(
        "Preparando notificación de contacto: to=%s via=%s:%s ssl=%s tls=%s",
        settings.smtp_user,
        settings.smtp_host,
        settings.smtp_port,
        settings.smtp_use_ssl,
        settings.smtp_use_tls,
    )
    if not settings.smtp_user or not settings.smtp_password:
        logger.warning("No se enviará correo: SMTP credentials no configuradas.")
        return

    msg = EmailMessage()
    msg['Subject'] = f"🚀 Nuevo contacto en Portafolio: {name}"
    msg['From'] = settings.smtp_user
    msg['To'] = settings.smtp_user # Te lo envías a ti mismo
    msg['Reply-To'] = sender_email

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
        logger.debug("Conectando al SMTP configurado")
        smtp_factory = smtplib.SMTP_SSL if settings.smtp_use_ssl else smtplib.SMTP
        with smtp_factory(
            settings.smtp_host,
            settings.smtp_port,
            timeout=settings.smtp_timeout_seconds,
        ) as smtp:
            if not settings.smtp_use_ssl and settings.smtp_use_tls:
                logger.debug("Iniciando STARTTLS")
                smtp.starttls()

            logger.debug("Autenticando usuario SMTP")
            smtp.login(settings.smtp_user, settings.smtp_password)
            logger.debug("Enviando mensaje SMTP")
            smtp.send_message(msg)
            logger.info("Correo de notificación enviado con éxito.")
    except Exception as e:
        logger.exception("Error al enviar el correo de contacto")


@router.post("/contact", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
async def submit_contact(
    payload: ContactMessageCreate,
    request: Request,
    background_tasks: BackgroundTasks,
    database=Depends(get_database),
    settings: Settings = Depends(get_settings),
) -> ContactResponse:
    """Persist a contact message in MongoDB and send an email notification."""
    logger.info("Solicitud de contacto recibida: name=%s email=%s", payload.name, payload.email)
    await _enforce_contact_rate_limit(request, settings)

    message = ContactMessage(
        **payload.model_dump(),
        created_at=datetime.now(timezone.utc),
    )
    # Guardamos en la base de datos
    await database.contact_messages.insert_one(message.model_dump())
    logger.info("Mensaje de contacto guardado en MongoDB")

    # 2. Programamos el correo para que se envíe en segundo plano
    background_tasks.add_task(
        send_email_notification,
        name=payload.name,
        sender_email=payload.email,
        content=payload.content,
        settings=settings
    )
    logger.info("Notificación por correo programada en background")

    # 3. Respondemos al frontend inmediatamente, sin hacerle esperar por el email
    return ContactResponse(status="success")

from asyncio import Lock
from collections import defaultdict
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, Request, status

from ..core.config import Settings, get_settings
from ..core.database import get_database
from ..models.schemas import (
    ContactMessage,
    ContactMessageCreate,
    ContactResponse,
    Experience,
    PersonalInfo,
    Project,
    ProjectLink,
    Skill,
)

router = APIRouter()

PROFILE = PersonalInfo(
    name="Your Name",
    title="Full Stack Engineer",
    summary=(
        "I build product-focused web applications with a strong foundation in "
        "frontend architecture, API design, and cloud-native delivery."
    ),
    github_url="https://github.com/your-handle",
    linkedin_url="https://www.linkedin.com/in/your-handle/",
    email="hello@example.com",
)

EXPERIENCES = [
    Experience(
        id="exp-1",
        company="Northwind Labs",
        position="Senior Frontend Engineer",
        start_date="2022-03",
        end_date="Present",
        description=[
            "Led the rewrite of a legacy SPA into a Nuxt-based experience with SSR.",
            "Improved page performance, accessibility, and design consistency across product surfaces.",
        ],
        technologies=["Nuxt", "Vue", "TypeScript", "Pinia", "PrimeVue"],
    ),
    Experience(
        id="exp-2",
        company="Atlas Systems",
        position="Backend Engineer",
        start_date="2019-08",
        end_date="2022-02",
        description=[
            "Designed FastAPI services with async persistence and clear request boundaries.",
            "Introduced operational safeguards for API validation and form submission workflows.",
        ],
        technologies=["FastAPI", "Python", "MongoDB", "Motor", "Docker"],
    ),
]

SKILLS = [
    Skill(category="Frontend", items=["Vue 3", "Nuxt 3", "TypeScript", "Pinia"], proficiency=92),
    Skill(category="Backend", items=["FastAPI", "Pydantic", "MongoDB", "Async IO"], proficiency=88),
    Skill(category="DevOps", items=["Docker", "Docker Compose", "Linux", "CI/CD"], proficiency=80),
]

PROJECTS = [
    Project(
        id="simulapucv",
        title="SimulaPUCV",
        short_description="Plataforma de simulación educativa con visualización en tiempo real",
        description="SimulaPUCV es una plataforma interactiva de simulación diseñada para estudiantes de ingeniería. Permite visualizar en tiempo real procesos complejos de sistemas dinámicos. Construida con React, Go backend y PostgreSQL para máximo rendimiento.",
        images=["https://via.placeholder.com/1200x800?text=SimulaPUCV"],
        technologies=["React", "Go", "PostgreSQL"],
        links=[ProjectLink(type="github", url="https://github.com/jsk11L/proyecto-generico", label="GitHub")],
        created_at="2023-09-20",
    ),
    Project(
        id="omnidesk",
        title="OmniDesk",
        short_description="Suite de productividad multiplataforma con sincronización en la nube",
        description="OmniDesk es una solución integral de productividad que funciona en web, móvil y escritorio. Ofrece sincronización en tiempo real entre dispositivos, gestión de tareas, notas y calendario. Stack moderno con arquitectura escalable.",
        images=["https://via.placeholder.com/1200x800?text=OmniDesk"],
        technologies=["Angular", "NestJS", "React Native", "PostgreSQL"],
        links=[ProjectLink(type="github", url="https://github.com/jsk11L/proyecto-generico", label="GitHub")],
        created_at="2023-06-15",
    ),
    Project(
        id="jamspace",
        title="JamSpace",
        short_description="Plataforma colaborativa de música en tiempo real con Web Audio API",
        description="JamSpace permite a músicos colaborar en tiempo real desde cualquier lugar. Características incluyen sincronización de audio, metrónomo compartido y grabación en la nube. Utiliza Web Audio API para procesamiento de audio de baja latencia.",
        images=["https://via.placeholder.com/1200x800?text=JamSpace"],
        technologies=["Next.js", "Supabase", "Web Audio API"],
        links=[ProjectLink(type="github", url="https://github.com/jsk11L/proyecto-generico", label="GitHub")],
        created_at="2024-02-28",
    ),
]

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
async def get_profile() -> PersonalInfo:
    return PROFILE


@router.get("/experience", response_model=list[Experience])
async def get_experience(tech: str | None = None) -> list[Experience]:
    if not tech:
        return EXPERIENCES

    normalized_tech = tech.casefold()
    return [
        experience
        for experience in EXPERIENCES
        if any(normalized_tech in technology.casefold() for technology in experience.technologies)
    ]


@router.get("/skills", response_model=list[Skill])
async def get_skills() -> list[Skill]:
    return SKILLS


@router.get("/projects", response_model=list[Project])
async def get_projects() -> list[Project]:
    return PROJECTS


@router.post("/contact", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
async def submit_contact(
    payload: ContactMessageCreate,
    request: Request,
    database=Depends(get_database),
    settings: Settings = Depends(get_settings),
) -> ContactResponse:
    await _enforce_contact_rate_limit(request, settings)

    message = ContactMessage(
        **payload.model_dump(),
        created_at=datetime.now(timezone.utc),
    )
    await database.contact_messages.insert_one(message.model_dump())
    return ContactResponse(status="success")

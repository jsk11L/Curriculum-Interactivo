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

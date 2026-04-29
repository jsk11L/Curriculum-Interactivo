"""Seed data and auto-population for MongoDB collections."""

import logging
from datetime import datetime, timezone
from urllib.parse import quote

from motor.motor_asyncio import AsyncIOMotorDatabase

logger = logging.getLogger(__name__)

PROFILE_DATA = {
    "name": "Javier Sepúlveda",
    "title": "Estudiante de 5to año de Ingeniería Civil Informática",
    "summary": (
        "Estudiante de 5to año de Ingeniería Civil Informática apasionado "
        "por construir software y herramientas que voy viendo necesario en "
        "mi vida y que pueden ser útil a más gente. Tengo experiencia en "
        "investigación y soy co-autor de una publicación de optimización de "
        "cronogramas hospitalarios. Me apasionan la música y los videojuegos."
    ),
    "github_url": "https://github.com/jsk11L",
    "linkedin_url": "https://www.linkedin.com/in/jasepulvedaca/",
    "email": "jasepulvedaca@gmail.com",
}

EXPERIENCES_DATA = [
    {
        "id": "exp-programming",
        "company": "Pontificia Universidad Católica de Valparaíso",
        "position": "Ayudante de Programación — SimulaPUCV",
        "start_date": "2026-03",
        "end_date": "Present",
        "description": [
            "Desarrollo y programación de SimulaPUCV, herramienta de simulación "
            "de generaciones universitarias, bajo la dirección de profesor.",
            "Implementación de módulos de simulación, análisis de datos "
            "y visualización de resultados. Traslado de código de MatLab a Go.",
        ],
        "technologies": ["React", "Go", "PostgreSQL", "Docker"],
    },
    {
        "id": "exp-research",
        "company": "Pontificia Universidad Católica de Valparaíso",
        "position": "Ayudante de Investigación",
        "start_date": "2024-11",
        "end_date": "2025-08",
        "description": [
            "Investigación en metaheurísticas aplicadas a problemas NP-hard "
            "como Set Covering Problem y Roman Domination Problem.",
            "Co-autor de paper publicado en optimización de cronogramas hospitalarios.",
            "Desarrollo de soluciones algorítmicas y análisis de rendimiento "
            "de diferentes enfoques de optimización.",
        ],
        "technologies": ["Python", "Matlab", "Go", "Metaheurísticas"],
    },
    {
        "id": "exp-teaching",
        "company": "Pontificia Universidad Católica de Valparaíso",
        "position": "Ayudante de Asignaturas",
        "start_date": "2023-03",
        "end_date": "2025-12",
        "description": [
            "Ayudantías en Fundamentos de Algoritmos, Fundamentos de Programación, "
            "Estructuras de Datos, Análisis y Diseño de Algoritmos y Programación Avanzada.",
            "Preparación de material didáctico, evaluación de trabajos y "
            "apoyo a estudiantes en resolución de problemas de programación.",
            "Liderazgo de sesiones prácticas con grupos de 20+ estudiantes.",
        ],
        "technologies": ["Python", "C", "C++", "Java", "Algoritmos"],
    },
    {
        "id": "exp-security",
        "company": "Empresa de Seguridad Privada",
        "position": "Guardia de Seguridad — Central de Monitoreo",
        "start_date": "2025-10",
        "end_date": "2026-01",
        "description": [
            "Monitoreo de cámaras de vigilancia en central de seguridad.",
            "Gestión de incidencias y coordinación con equipos en terreno.",
        ],
        "technologies": ["Monitoreo CCTV", "Gestión de incidencias"],
    },
]

SKILLS_DATA = [
    {
        "category": "Lenguajes",
        "items": ["TypeScript", "Go", "Python", "C / C# / C++", "Java", "Matlab"],
        "proficiency": 85,
    },
    {
        "category": "Frontend",
        "items": ["React", "React Native", "Vue 3", "Nuxt 3", "Angular", "Next.js"],
        "proficiency": 88,
    },
    {
        "category": "Backend",
        "items": ["Node.js", "NestJS", "FastAPI"],
        "proficiency": 82,
    },
    {
        "category": "Datos",
        "items": ["PostgreSQL", "MongoDB", "Supabase"],
        "proficiency": 78,
    },
    {
        "category": "DevOps",
        "items": ["Docker", "Docker Compose", "Git", "GitHub"],
        "proficiency": 80,
    },
    {
        "category": "Otros",
        "items": ["Unity", "TailwindCSS"],
        "proficiency": 75,
    },
    {
        "category": "Habilidades Blandas",
        "items": [
            "Adaptabilidad tecnológica",
            "Aprendizaje autónomo",
            "Trabajo en equipo",
            "Resolución de problemas",
            "Pensamiento analítico",
            "Comunicación efectiva",
            "Gestión y planificación de proyectos",
            "Responsabilidad",
        ],
        "proficiency": 90,
    },
]

PROJECTS_DATA = [
    {
        "id": "simulapucv",
        "title": "SimulaPUCV",
        "short_description": "Herramienta de análisis y simulación de generaciones universitarias",
        "description": (
            "SimulaPUCV es una plataforma interactiva de simulación diseñada para "
            "analizar y simular generaciones universitarias completas. Permite "
            "visualizar el comportamiento de cohortes estudiantiles a lo largo "
            "del tiempo, modelando inscripción, rendimiento académico y tasas de "
            "graduación. Construida con React y Go para máximo rendimiento, "
            "con PostgreSQL como motor de datos."
        ),
        "images": [
            "/images/projects/simulapucv-cover.png"
        ],
        "technologies": ["React", "Go", "PostgreSQL", "Tailwind CSS", "Vite"],
        "links": [
            {
                "type": "github",
                "url": "https://github.com/jsk11L/Simulador-PUCV.git",
                "label": "GitHub",
            }
        ],
        "created_at": "2026-03-29",
    },
    {
        "id": "omnidesk",
        "title": "OmniDesk",
        "short_description": "Organizador personal multiplataforma con sincronización en la nube",
        "description": (
            "OmniDesk es un organizador personal disponible como página web "
            "y aplicación móvil. Ofrece gestión de tareas, listas, notas, calendario "
            "y notificaciones personalizables con sincronización en tiempo real "
            "entre dispositivos. Stack moderno con arquitectura escalable "
            "diseñada para productividad real."
        ),
        "images": [
            "/images/projects/omnidesk-cover.png"
        ],
        "technologies": ["Angular", "NestJS", "React Native", "PostgreSQL"],
        "links": [
            {
                "type": "github",
                "url": "https://github.com/jsk11L/OmniDesk-App",
                "label": "GitHub App",
            },
            {
                "type": "github",
                "url": "https://github.com/jsk11L/OmniDesk-Web",
                "label": "GitHub Web",
            },
        ],
        "created_at": "",
    },
    {
        "id": "jamspace",
        "title": "JamSpace",
        "short_description": "Aplicación para gestionar datos de banda musical",
        "description": (
            "JamSpace es una aplicación diseñada para bandas musicales que "
            "permite gestionar audios, ideas, letras y material creativo "
            "de forma centralizada. Incluye grabación, organización de "
            "sesiones y colaboración entre miembros de la banda."
        ),
        "images": [
            "/images/projects/jamspace-cover.png"
        ],
        "technologies": ["Next.js", "Supabase", "Web Audio API"],
        "links": [
            {
                "type": "github",
                "url": "https://github.com/jsk11L/JamSpace-App",
                "label": "GitHub App",
            },
            {
                "type": "github",
                "url": "https://github.com/jsk11L/JamSpace-Web",
                "label": "GitHub Web",
            },
        ],
        "created_at": "",
    },
    {
        "id": "interiortwin",
        "title": "InteriorTwin",
        "short_description": "Aplicación AR para diseño de interiores con objetos escaneados",
        "description": (
            "InteriorTwin es una aplicación desarrollada en Unity que permite "
            "mover, reescalar y colocar objetos en entornos interiores con "
            "simulación de físicas realistas. La característica distintiva es "
            "que los objetos son modelos escaneados de la realidad, permitiendo "
            "una experiencia de diseño de interiores auténtica. Proyecto "
            "desarrollado en equipo durante la carrera universitaria."
        ),
        "images": [
            "/images/projects/interiortwin-cover.png"
        ],
        "technologies": ["Unity", "C#", "3D Scanning", "AR"],
        "links": [
            {
                "type": "github",
                "url": "https://github.com/jsk11L/Interior-Twin-Project.git",
                "label": "GitHub",
            }
        ],
        "created_at": "2025-06-22",
    },
    {
        "id": "loopmania",
        "title": "LoopMania",
        "short_description": "Videojuego educativo que enseña programación mediante gameplay",
        "description": (
            "LoopMania es un videojuego educativo desarrollado en Unity donde "
            "el jugador avanza colocando órdenes de forma similar a escribir "
            "código. El juego enseña el uso de loops, secuencias y lógica de "
            "programación de forma interactiva y entretenida. Desarrollado "
            "en colaboración con un compañero de universidad."
        ),
        "images": [
            "/images/projects/loopmania-cover.png"
        ],
        "technologies": ["Unity", "C#", "Game Design"],
        "links": [
            {
                "type": "github",
                "url": "https://github.com/Kiziio1/Loop-Mania.git",
                "label": "GitHub",
            }
        ],
        "created_at": "2025-11-17",
    },
]


async def seed_database(db: AsyncIOMotorDatabase) -> bool:
    """Drop and re-populate MongoDB collections from seed data.

    Always re-seeds to ensure the database matches the current seed file.
    """
    for coll in ("profile", "experiences", "skills", "projects"):
        await db[coll].drop()

    await db.profile.insert_one(PROFILE_DATA.copy())
    await db.experiences.insert_many([e.copy() for e in EXPERIENCES_DATA])
    await db.skills.insert_many([s.copy() for s in SKILLS_DATA])
    await db.projects.insert_many([p.copy() for p in PROJECTS_DATA])

    logger.info(
        "✓ Seeded database: profile, %d experiences, %d skills, %d projects",
        len(EXPERIENCES_DATA),
        len(SKILLS_DATA),
        len(PROJECTS_DATA),
    )
    return True

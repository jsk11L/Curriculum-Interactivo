# Curriculum Interactivo

Currículum interactivo con diseño **Dark Hacker Terminal** — monorepo con backend FastAPI + MongoDB y frontend Nuxt 3 + Vue 3.

## Stack

| Capa | Tecnologías |
|------|-------------|
| Frontend | Nuxt 3, Vue 3, Pinia, PrimeVue, Chart.js, Lucide-Vue, SCSS |
| Backend | FastAPI, Motor (async MongoDB), Pydantic |
| Base de datos | MongoDB |
| Infraestructura | Docker, Docker Compose |

## Estructura

```
├── backend/
│   └── app/
│       ├── api/endpoints.py      # Rutas API (CRUD desde MongoDB)
│       ├── core/
│       │   ├── config.py          # Settings con Pydantic
│       │   ├── database.py        # Conexión MongoDB (Motor)
│       │   └── seed.py            # Datos reales + seed automático
│       └── models/schemas.py      # Schemas Pydantic
├── frontend/
│   ├── assets/
│   │   ├── scss/main.scss         # Design system global
│   │   └── profile.png            # Foto de perfil
│   ├── components/
│   │   ├── HeroSection.vue        # Terminal con typewriter + foto superpuesta
│   │   ├── SkillsChart.vue        # Radar chart + grilla de tags
│   │   ├── ExperienceTimeline.vue  # Timeline custom dark
│   │   ├── ProjectsGrid.vue       # Grid de proyectos
│   │   └── ProjectCard.vue         # Card individual con fecha/tech
│   ├── layouts/default.vue         # Layout con header sticky + footer
│   ├── pages/
│   │   ├── index.vue               # Home: hero → proyectos → exp + skills → contacto
│   │   ├── contact.vue             # Formulario de contacto
│   │   └── projects/[id].vue       # Detalle de proyecto
│   ├── plugins/primevue.ts         # PrimeVue (dark mode forzado)
│   └── stores/cvStore.ts           # Store Pinia (fuente de verdad)
└── docker-compose.yml
```

## Endpoints API

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/health` | Health check |
| `GET` | `/api/v1/profile` | Información personal |
| `GET` | `/api/v1/experience` | Experiencias (filtro opcional `?tech=xyz`) |
| `GET` | `/api/v1/skills` | Skills por categoría con proficiency |
| `GET` | `/api/v1/projects` | Proyectos (con links múltiples) |
| `POST` | `/api/v1/contact` | Enviar mensaje (rate limited) |

## Persistencia

Los datos se almacenan en MongoDB. Al iniciar el backend, `seed.py` **siempre** hace drop y re-insert de las colecciones para que los cambios en el archivo se reflejen inmediatamente.

> **Nota**: en producción, desactivar el drop automático y usar migraciones.

## Desarrollo local

```bash
# Backend
cd backend
uvicorn app.main:app --reload

# Frontend
cd frontend
npm install
npm run dev
```

## Docker

```bash
docker compose up --build
```

MongoDB arranca con healthcheck. El backend espera a que MongoDB esté healthy. El frontend usa `npm run preview` (requiere build previo — el Dockerfile lo maneja).

## Diseño

- Fondo oscuro (`#0a0a0a`) con gradientes rojos sutiles
- Tipografía monospace (Fira Code via Google Fonts)
- Acentos en rojo (`#dc2626`)
- Terminal interactiva con efecto typewriter en el hero
- Foto de perfil en ventana terminal superpuesta
- Bordes cuadrados, estética minimalista
- Scrollbar y text-selection personalizados

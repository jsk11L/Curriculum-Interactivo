# Curriculum Interactivo

Monorepo de referencia para un curriculo interactivo con backend FastAPI + MongoDB y frontend Nuxt 3 + Vue 3.

## Estructura

- `backend/`: API FastAPI con schemas Pydantic, conexion a MongoDB y endpoint de contacto con rate limiting basico.
- `frontend/`: interfaz Nuxt 3 con Pinia, PrimeVue, radar chart para habilidades y formulario de contacto.
- `docker-compose.yml`: levanta MongoDB, backend y frontend.

## Variables de entorno

- `MONGO_URI=mongodb://mongodb:27017/cv_db`
- `API_URL=http://backend:8000`
- `NUXT_PUBLIC_API_URL=http://localhost:8000/api/v1`

## Endpoints

- `GET /api/v1/profile`
- `GET /api/v1/experience?tech=vue`
- `GET /api/v1/skills`
- `POST /api/v1/contact`

## Desarrollo local

Backend:

```bash
cd backend
uvicorn app.main:app --reload
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

## Docker

```bash
docker compose up --build
```

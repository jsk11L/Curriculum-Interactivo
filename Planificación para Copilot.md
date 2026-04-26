# **Contexto de Proyecto para GitHub Copilot: Currículum Interactivo Multi-Stack**

**Instrucciones para la IA (Copilot):**

Actúa como un desarrollador Full-Stack experto (Senior Frontend & Senior Backend). Utiliza este documento como contexto principal para generar código, sugerir arquitecturas y resolver dependencias. El objetivo es construir una aplicación web SPA/SSR que funcione como un currículum interactivo.

## **1\. Stack Tecnológico Estricto**

* **Backend:** Python 3.12, FastAPI, Uvicorn, Pydantic (Validación).  
* **Base de Datos:** MongoDB (Driver asíncrono: motor).  
* **Frontend:** Vue 3 (Composition API), Nuxt 3, TypeScript.  
* **Gestión de Estado (Frontend):** Pinia.  
* **Estilos y UI:** PrimeVue, TailwindCSS (o Sass nativo), Lucide Vue (iconos).  
* **Infraestructura:** Docker, Docker Compose.

## **2\. Estructura de Directorios Deseada**

La base del código debe seguir la siguiente estructura monorepo:

cv-interactivo/  
├── backend/  
│   ├── app/  
│   │   ├── api/  
│   │   │   ├── endpoints.py  
│   │   ├── core/  
│   │   │   ├── config.py (Configuración Pydantic/Envs)  
│   │   │   ├── database.py (Conexión Motor)  
│   │   ├── models/  
│   │   │   ├── schemas.py (Modelos Pydantic)  
│   │   ├── main.py (Punto de entrada FastAPI)  
│   ├── requirements.txt  
│   ├── Dockerfile  
├── frontend/  
│   ├── assets/  
│   │   ├── scss/  
│   ├── components/  
│   │   ├── HeroSection.vue  
│   │   ├── ExperienceTimeline.vue  
│   │   ├── SkillsChart.vue  
│   │   ├── ContactForm.vue  
│   ├── layouts/  
│   │   ├── default.vue  
│   ├── pages/  
│   │   ├── index.vue  
│   ├── stores/  
│   │   ├── cvStore.ts (Pinia)  
│   ├── nuxt.config.ts  
│   ├── package.json  
│   ├── Dockerfile  
├── docker-compose.yml  
├── .env  
├── README.md

## **3\. Especificaciones del Backend (FastAPI \+ MongoDB)**

### **3.1. Modelos de Datos (Schemas Pydantic objetivo)**

**1\. PersonalInfo:**

* name: str  
* title: str  
* summary: str  
* github\_url: HttpUrl  
* linkedin\_url: HttpUrl  
* email: EmailStr

**2\. Experience:**

* id: str  
* company: str  
* position: str  
* start\_date: str (YYYY-MM)  
* end\_date: str (YYYY-MM | "Present")  
* description: List\[str\]  
* technologies: List\[str\]

**3\. Skill:**

* category: str (ej. "Frontend", "Backend", "DevOps")  
* items: List\[str\]  
* proficiency: int (1-100)

**4\. Message (Contacto):**

* name: str  
* email: EmailStr  
* content: str  
* created\_at: datetime

### **3.2. Endpoints (Rutas API)**

| Método | Endpoint | Respuesta Esperada | Notas |
| :---- | :---- | :---- | :---- |
| GET | /api/v1/profile | PersonalInfo JSON | \- |
| GET | /api/v1/experience | List\[Experience\] JSON | Aceptar query param opcional ?tech=xyz para filtrar. |
| GET | /api/v1/skills | List\[Skill\] JSON | \- |
| POST | /api/v1/contact | { "status": "success" } | Validar payload con Pydantic. Guardar en BD. Implementar Rate Limiting básico. |

## **4\. Especificaciones del Frontend (Nuxt 3 \+ Vue 3\)**

### **4.1. Reglas de Desarrollo**

* Usar \<script setup lang="ts"\> en todos los componentes.  
* Consumir la API usando useFetch de Nuxt (para aprovechar SSR).  
* Manejar el estado global (datos del perfil, experiencias) con Pinia en stores/cvStore.ts.  
* Usar componentes de PrimeVue para el timeline (Timeline), inputs (InputText, Textarea), y botones (Button).  
* Los gráficos de habilidades deben implementarse preferiblemente con chart.js o vue-chartjs (Gráfico de Radar).

## **5\. Especificaciones de Infraestructura (Docker)**

* **docker-compose.yml**: Debe levantar 3 servicios:  
  1. mongodb: Imagen oficial mongo:latest. Exponer puerto 27017\.  
  2. backend: Construido desde ./backend/Dockerfile. Depende de mongodb. Exponer puerto 8000\. Cargar variables de entorno.  
  3. frontend: Construido desde ./frontend/Dockerfile (Node 20+). Depende de backend. Exponer puerto 3000\.  
* **Variables de Entorno necesarias (.env)**:  
  * MONGO\_URI=mongodb://mongodb:27017/cv\_db  
  * API\_URL=http://backend:8000 (Para SSR interno en Docker)  
  * NUXT\_PUBLIC\_API\_URL=http://localhost:8000/api/v1 (Para el cliente web)

## **6\. Prompts Iniciales Recomendados (Hoja de Ruta para Copilot)**

*(Guía para el desarrollador: Pide a Copilot que ejecute estas tareas en este orden)*

1. **"Fase 1 (Backend):** Genera el archivo backend/requirements.txt y la estructura base de FastAPI en main.py, configurando la conexión a MongoDB usando Motor."  
2. **"Fase 2 (Modelos):** Crea los esquemas de Pydantic en models/schemas.py basándote en la sección 3.1 de este documento."  
3. **"Fase 3 (Endpoints):** Implementa los 4 endpoints descritos en la sección 3.2 en el archivo main.py o en un router separado."  
4. **"Fase 4 (Frontend Setup):** Genera el archivo nuxt.config.ts configurando PrimeVue y los módulos de Pinia."  
5. **"Fase 5 (Pinia):** Crea el archivo stores/cvStore.ts con la lógica para hacer fetch a los endpoints del backend."  
6. **"Fase 6 (Docker):** Genera el docker-compose.yml y los Dockerfile para backend y frontend según las especificaciones de la sección 5."
# Estado del Proyecto

Fecha: 2026-04-28

## Estado actual

- Monorepo con backend FastAPI + MongoDB y frontend Nuxt 3 + Vue 3.
- **Persistencia en MongoDB**: Perfil, experiencias, skills y proyectos se leen de la base de datos. Seed con drop + re-insert al iniciar.
- **Datos reales**: Javier Sepúlveda — perfil, 4 experiencias, 7 categorías de skills, 5 proyectos con links correctos.
- **Tema Dark Terminal unificado**: Todas las páginas usan el tema dark hacker. Fondos transparentes que se mezclan con el background.
- **Skills**: Habilidades blandas a la izquierda del radar chart (arriba), grilla de tags técnicos (abajo).
- **Timeline custom**: Timeline de experiencia sin PrimeVue, con estilo terminal.
- **Hero**: Terminal grande con typewriter + ventana de foto superpuesta con dimensiones no convencionales (3:3.8).
- **Proyectos**: Sección de proyectos aparece antes que experiencia y skills. Proyectos en desarrollo muestran "En desarrollo" en vez de fecha.
- **Contacto**: Una sola implementación en `contact.vue`, sin componente duplicado. Espaciado mejorado.
- Docker Compose funcional con healthchecks.

## Experiencias registradas

| Experiencia | Periodo |
|-------------|---------|
| Ayudante de Programación (SimulaPUCV) | 2026-03 → Present |
| Ayudante de Investigación | 2024-11 → 2025-08 |
| Ayudante de Asignaturas | 2023-03 → 2025-12 |
| Guardia de Seguridad | 2025-10 → 2026-01 |

## Proyectos registrados

| Proyecto | Estado | Links |
|----------|--------|-------|
| SimulaPUCV | 2026-03-29 | [GitHub](https://github.com/jsk11L/Simulador-PUCV.git) |
| OmniDesk | En desarrollo | [App](https://github.com/jsk11L/OmniDesk-App) · [Web](https://github.com/jsk11L/OmniDesk-Web) |
| JamSpace | En desarrollo | [App](https://github.com/jsk11L/JamSpace-App) · [Web](https://github.com/jsk11L/JamSpace-Web) |
| InteriorTwin | 2025-06-22 | [GitHub](https://github.com/jsk11L/Interior-Twin-Project.git) |
| LoopMania | 2024-01-15 | [GitHub](https://github.com/Kiziio1/Loop-Mania.git) |

## Pendientes

- Agregar imágenes a los proyectos (ver `GUIA_IMAGENES.md`).
- "Resumen Profesional" en la home pendiente de revisión de contenido.
- Rate limiting persistente (actualmente in-memory).
- Tests básicos (API y UI).
- Revisar CORS para distintos entornos.

## Observaciones técnicas

- El seed siempre hace drop + re-insert (bueno para desarrollo, desactivar en producción).
- `nuxt preview` usa variables de entorno `HOST` y `PORT`, NO flags CLI.
- PrimeVue con `darkModeSelector: false` (siempre dark).
- Google Fonts (Fira Code) importado en SCSS global.

# Guía: Imágenes de proyectos

## Resumen

Cada proyecto debe tener al menos una imagen principal en `images[0]`. Esa imagen se usa como cover en la tarjeta del proyecto y como banner en la página de detalle.

## Estado actual

El seed ya genera un cover SVG embebido para cada proyecto, así que las páginas muestran imagen aunque todavía no existan archivos reales en disco.

## Convención recomendada

Si luego quieres reemplazar los covers generados por archivos reales, usa esta carpeta:

```
frontend/public/images/projects/
```

Nombra los archivos con el `id` del proyecto como prefijo:

| Proyecto | Cover principal |
|----------|-----------------|
| SimulaPUCV | `simulapucv-cover.png` |
| OmniDesk | `omnidesk-cover.png` |
| JamSpace | `jamspace-cover.png` |
| InteriorTwin | `interiortwin-cover.png` |
| LoopMania | `loopmania-cover.png` |

## Cómo cargar las imágenes

En `backend/app/core/seed.py`, el campo `images` debe tener al menos un elemento:

```python
{
    "id": "simulapucv",
    ...
    "images": [
        "/images/projects/simulapucv-cover.png",
    ],
    ...
}
```

Si usas archivos reales, las rutas empiezan con `/` porque Nuxt sirve `frontend/public/` en la raíz del sitio.

## Dónde se renderizan

| Ubicación | Qué muestra |
|-----------|-------------|
| `ProjectCard.vue` | La primera imagen del array como cover |
| `projects/[id].vue` | Banner principal con `images[0]` y galería con el resto |
| `HeroSection.vue` | `frontend/assets/profile.png` para la foto personal |

## Reinicio

Después de cambiar el seed, reinicia el backend o levanta todo de nuevo para que el drop + reinsert aplique los cambios.

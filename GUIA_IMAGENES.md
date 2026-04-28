# Guía: Cómo agregar imágenes a los proyectos

## Resumen

Las imágenes de los proyectos se sirven desde el array `images` en cada proyecto del seed. Para que se muestren en la web, las imágenes deben estar accesibles desde el navegador.

## Opción 1: Carpeta estática del frontend (recomendada para desarrollo)

### Paso 1 — Crear la carpeta

```
frontend/public/images/projects/
```

### Paso 2 — Nombrar las imágenes

Usa el `id` del proyecto como prefijo. Convención:

| Proyecto | Imagen principal | Imágenes adicionales |
|----------|------------------|---------------------|
| SimulaPUCV | `simulapucv-cover.png` | `simulapucv-2.png`, `simulapucv-3.png` |
| OmniDesk | `omnidesk-cover.png` | `omnidesk-2.png`, `omnidesk-3.png` |
| JamSpace | `jamspace-cover.png` | `jamspace-2.png`, `jamspace-3.png` |
| InteriorTwin | `interiortwin-cover.png` | `interiortwin-2.png`, `interiortwin-3.png` |
| LoopMania | `loopmania-cover.png` | `loopmania-2.png`, `loopmania-3.png` |

### Paso 3 — Colocar los archivos

```
frontend/public/images/projects/
├── simulapucv-cover.png
├── simulapucv-2.png
├── omnidesk-cover.png
├── jamspace-cover.png
├── interiortwin-cover.png
├── interiortwin-2.png
├── loopmania-cover.png
└── loopmania-2.png
```

### Paso 4 — Actualizar el seed

En `backend/app/core/seed.py`, agrega las rutas al array `images` de cada proyecto:

```python
# Ejemplo para SimulaPUCV
{
    "id": "simulapucv",
    ...
    "images": [
        "/images/projects/simulapucv-cover.png",
        "/images/projects/simulapucv-2.png",
    ],
    ...
}
```

Las rutas empiezan con `/` porque Nuxt sirve la carpeta `public/` en la raíz del sitio.

### Paso 5 — Reiniciar

```bash
docker compose up --build
```

El seed hace drop + re-insert automáticamente, así que los cambios se reflejan al reiniciar.

## Opción 2: URLs externas

Si prefieres hostear las imágenes en un CDN o servicio externo (Cloudinary, Imgur, etc.), simplemente pon la URL completa en el array `images`:

```python
"images": [
    "https://i.imgur.com/abc123.png",
    "https://res.cloudinary.com/demo/image/upload/sample.jpg",
],
```

## Foto de perfil

La foto de perfil del hero está en:

```
frontend/assets/profile.png
```

Reemplaza este archivo con tu foto real. Se importa estáticamente en `HeroSection.vue` así que se procesa durante el build.

**Formato recomendado**: PNG o JPG, mínimo 400x500px, orientación retrato.

## Dónde se renderizan

| Ubicación | Qué muestra |
|-----------|-------------|
| `ProjectCard.vue` | Primera imagen del array (`images[0]`) como cover |
| `projects/[id].vue` | Banner principal (`images[0]`) + galería (todas las imágenes) |
| `HeroSection.vue` | `assets/profile.png` (NO es del seed, es estática) |

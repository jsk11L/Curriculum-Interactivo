# Estrategias de Seeding de Base de Datos

## Resumen

El backend ahora soporta 3 estrategias de seeding configurables mediante la variable de entorno `SEED_STRATEGY`.

### Estrategias disponibles

#### 1. **`clean_and_populate`** (por defecto)
- **Comportamiento**: Borra completamente todas las colecciones y las repuebla con datos frescos.
- **Casos de uso**: 
  - Despliegues en producción (garantiza estado limpio)
  - Desarrollo local
  - Testing
  - **Resuelve el problema de duplicados**

```bash
SEED_STRATEGY=clean_and_populate
```

#### 2. **`replace`**
- **Comportamiento**: Reemplaza documentos existentes por su ID/categoría, manteniendo otros documentos intactos.
- **Casos de uso**:
  - Actualizar solo ciertos documentos del curriculum
  - Preservar datos adicionales que no sean parte del seed
- **Funciona así**:
  - Experiencias: reemplaza por `id`
  - Habilidades: reemplaza por `category`
  - Proyectos: reemplaza por `id`
  - Perfil: reemplaza el documento único

```bash
SEED_STRATEGY=replace
```

#### 3. **`skip_if_exists`**
- **Comportamiento**: Solo popula la base de datos si está vacía.
- **Casos de uso**:
  - Preserve datos existentes entre reinicios
  - Entornos donde los datos se administran manualmente

```bash
SEED_STRATEGY=skip_if_exists
```

## Configuración en Docker

### docker-compose.yml

```yaml
services:
  backend:
    build: ./backend
    environment:
      - MONGO_URI=mongodb://mongo:27017/curriculum
      - MONGO_DB_NAME=curriculum
      - SEED_STRATEGY=clean_and_populate  # O replace, skip_if_exists
```

## Ejemplo: Eliminar duplicados en producción

1. **Ejecutar despliegue con estrategia `clean_and_populate`**:
   ```bash
   docker compose up --build
   ```
   
2. **Verificar logs**:
   ```bash
   docker compose logs backend
   # Verá: "🔧 SEED_STRATEGY = clean_and_populate"
   # Verá: "Dropping existing collections..."
   # Verá: "✓ Seeding complete..."
   ```

## Logs registrados

Cuando inicia el backend, verá:
```
🔧 SEED_STRATEGY = clean_and_populate
🚀 Starting up Curriculum API...
🌱 Seeding database with strategy: clean_and_populate
Dropping existing collections...
  Deleted X documents from profile
  Deleted X documents from experiences
  Deleted X documents from skills
  Deleted X documents from projects
Populating collections with seed data...
✓ Seeding complete: profile, 3 experiences, 6 skills, 5 projects
✓ Startup complete
```

## Recomendación

Para **resolver el problema actual de duplicados**:
- Set `SEED_STRATEGY=clean_and_populate` en tu docker-compose.yml
- Redeploy la aplicación
- La base de datos se limpiarán cada vez que inicie

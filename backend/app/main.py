"""FastAPI application entrypoint and lifespan management."""

from contextlib import asynccontextmanager
import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api.endpoints import router as cv_router
from .core.config import get_settings
from .core.database import close_mongo_connection, connect_to_mongo, get_database
from .core.seed import seed_database

logger = logging.getLogger(__name__)

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("🚀 Starting up Curriculum API...")
    try:
        await connect_to_mongo()
        await seed_database(get_database())
        logger.info("✓ Startup complete")
    except Exception as e:
        logger.error(f"✗ Startup failed: {e}")
        raise
    
    yield
    
    logger.info("🛑 Shutting down...")
    await close_mongo_connection()
    logger.info("✓ Shutdown complete")


settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(cv_router, prefix=settings.api_v1_prefix)


@app.get("/health")
async def health_check() -> dict[str, str]:
    return {"status": "ok"}

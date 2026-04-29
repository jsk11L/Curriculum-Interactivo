"""FastAPI application entrypoint and lifespan management."""

import os
from contextlib import asynccontextmanager
import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api.endpoints import router as cv_router
from .core.config import get_settings
from .core.database import close_mongo_connection, connect_to_mongo, get_database, mongo_database
from .core.seed import seed_database

logger = logging.getLogger(__name__)

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    settings = get_settings()

    # Debug: log the URI being used (masked for security)
    raw_env = os.environ.get("MONGO_URI", "<NOT SET>")
    masked = raw_env[:20] + "..." if len(raw_env) > 20 else raw_env
    logger.info(f"🔧 ENV MONGO_URI = {masked}")
    logger.info(f"🔧 Settings mongo_uri = {settings.mongo_uri[:20]}...")

    logger.info("🚀 Starting up Curriculum API...")
    try:
        await connect_to_mongo()
        await seed_database(get_database())
        logger.info("✓ Startup complete")
    except Exception as e:
        logger.error(f"✗ MongoDB connection failed: {e}")
        logger.warning("⚠ App will start WITHOUT database — check MONGO_URI env var")
    
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
    allow_origins=["https://javier-sepulveda-dev.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(cv_router, prefix=settings.api_v1_prefix)


@app.get("/health")
async def health_check() -> dict[str, str]:
    db_status = "connected" if mongo_database is not None else "disconnected"
    return {"status": "ok", "database": db_status, "mongo_uri_env": os.environ.get("MONGO_URI", "<NOT SET>")[:25] + "..."}

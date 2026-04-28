"""MongoDB connection management helpers."""

import asyncio
import logging

from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase

from .config import get_settings

logger = logging.getLogger(__name__)

mongo_client: AsyncIOMotorClient | None = None
mongo_database: AsyncIOMotorDatabase | None = None


async def connect_to_mongo() -> None:
    global mongo_client, mongo_database

    settings = get_settings()
    try:
        mongo_client = AsyncIOMotorClient(
            settings.mongo_uri,
            serverSelectionTimeoutMS=5000,
            connectTimeoutMS=10000,
        )
        mongo_database = mongo_client[settings.mongo_db_name]
        
        # Verify connection
        await mongo_client.admin.command("ping")
        logger.info(f"✓ Connected to MongoDB at {settings.mongo_uri}")
    except Exception as e:
        logger.error(f"✗ Failed to connect to MongoDB: {e}")
        mongo_client = None
        mongo_database = None
        raise


async def close_mongo_connection() -> None:
    global mongo_client, mongo_database

    if mongo_client is not None:
        mongo_client.close()
    mongo_client = None
    mongo_database = None


def get_database() -> AsyncIOMotorDatabase:
    if mongo_database is None:
        raise RuntimeError("MongoDB has not been initialized")
    return mongo_database

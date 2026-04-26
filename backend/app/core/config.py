from functools import lru_cache
from pathlib import Path

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=Path(__file__).resolve().parents[3] / ".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_name: str = "Curriculum Interactivo API"
    api_v1_prefix: str = "/api/v1"
    mongo_uri: str = "mongodb://localhost:27017/cv_db"
    mongo_db_name: str = "cv_db"
    cors_origins: list[str] = Field(default_factory=lambda: ["http://localhost:3000"])
    contact_rate_limit_window_seconds: int = 60
    contact_rate_limit_max_requests: int = 5


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()

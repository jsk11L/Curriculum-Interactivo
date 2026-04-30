"""Configuration settings for the FastAPI backend."""

from functools import lru_cache
from pathlib import Path

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


REPO_ROOT = Path(__file__).resolve().parents[3]
BACKEND_ROOT = Path(__file__).resolve().parents[2]


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=tuple(
            env_path for env_path in (REPO_ROOT / ".env", BACKEND_ROOT / ".env") if env_path.exists()
        )
        or None,
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_name: str = "Curriculum Interactivo API"
    api_v1_prefix: str = "/api/v1"
    mongo_uri: str = "mongodb://mongodb:27017/cv_db"
    mongo_db_name: str = "cv_db"
    cors_origins: list[str] = Field(
        default_factory=lambda: ["*"]
    )
    contact_rate_limit_window_seconds: int = 90
    contact_rate_limit_max_requests: int = 5
    smtp_user: str | None = None
    smtp_password: str | None = None
    smtp_host: str = "smtp.gmail.com"
    smtp_port: int = 465
    smtp_use_ssl: bool = True
    smtp_use_tls: bool = False
    smtp_timeout_seconds: int = 20

    @field_validator("cors_origins", mode="before")
    @classmethod
    def parse_cors_origins(cls, v: object) -> list[str]:
        """Accept comma-separated string or JSON list from env vars."""
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(",") if origin.strip()]
        return v  # type: ignore[return-value]


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()


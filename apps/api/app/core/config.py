from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "tinyclaw API"
    app_version: str = "0.1.0"
    environment: str = "development"
    enable_docs: bool = True
    provider_store_path: Path = Path(".tinyclaw/providers.json")
    session_store_path: Path = Path(".tinyclaw/sessions.json")

    model_config = SettingsConfigDict(
        env_prefix="TINYCLAW_",
        env_file=".env",
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()

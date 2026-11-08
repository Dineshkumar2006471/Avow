"""
Global configuration for AVOW / verdict API using Pydantic Settings.
Reads securely from .env and system environment variables.
"""

import os
from pathlib import Path
from typing import Literal
from pydantic_settings import BaseSettings, SettingsConfigDict

# Root is c:\Users\bingi\AVOW
BASE_DIR = Path(__file__).resolve().parent.parent.parent


class Settings(BaseSettings):
    # Gnani API Credentials & Endpoints
    GNANI_API_KEY: str = ""
    GNANI_BASE_URL: str = "https://api.vachana.ai"
    GNANI_MAX_CONCURRENCY: int = 1
    STT_DEFAULT_MODEL: str = "prisma-v3.0"
    TTS_MODEL: str = "timbre-v3.0"
    TTS_VOICE_MALE: str = "Avinash"
    TTS_VOICE_FEMALE: str = "Tarika"
    MAX_WITNESSES_PER_UTTERANCE: int = 4

    # Budget Guards (5,000 credit limit protection)
    EST_CREDITS_PER_STT_CALL: float = 0.0
    EST_CREDITS_PER_TTS_CHAR: float = 0.0
    GLOBAL_CREDIT_BUDGET: int = 4000
    PUBLIC_DAILY_RUN_CAP: int = 150
    PUBLIC_RUNS_PER_IP_PER_HOUR: int = 6
    PUBLIC_RUNS_PER_IP_PER_DAY: int = 20

    # Service Secrets
    VERDICT_ADMIN_KEY: str = "avow_admin_secret_key"
    ALLOWED_ORIGINS: str = "http://localhost:5173,http://localhost:3000"
    ENV: Literal["local", "dev", "prod"] = "local"
    LOG_LEVEL: str = "INFO"

    # Database Path (SQLite)
    DB_PATH: str = "./data/avow.db"

    model_config = SettingsConfigDict(
        env_file=(BASE_DIR / ".env", ".env"),
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()

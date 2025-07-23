import os
from typing import Optional
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    openai_api_key: str
    mcp_server_port: int = 8000
    mcp_server_host: str = "localhost"
    log_level: str = "INFO"
    environment: str = "development"
    openai_model: str = "gpt-4o-mini"
    openai_temperature: float = 0.7
    openai_max_tokens: int = 2000

    class Config:
        env_file = ".env"
        case_sensitive = False
        extra = "ignore"  # Ignore extra fields from .env

settings = Settings() 
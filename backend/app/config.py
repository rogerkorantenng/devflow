from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    auth0_domain: str = ""
    auth0_client_id: str = ""
    auth0_client_secret: str = ""
    database_url: str = "sqlite+aiosqlite:///./devflow.db"
    frontend_url: str = "http://localhost:3000"

    class Config:
        env_file = ".env"


settings = Settings()

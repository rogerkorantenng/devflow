from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.db.database import init_db
from app.routes.workflows import router as workflows_router
from app.routes.activity import router as activity_router
from app.routes.services import router as services_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(title="DevFlow API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(workflows_router)
app.include_router(activity_router)
app.include_router(services_router)


@app.get("/health")
async def health():
    return {"status": "ok"}

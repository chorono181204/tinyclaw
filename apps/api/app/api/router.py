from fastapi import APIRouter

from app.api.routes import agents, files, health, providers, sessions, settings, skills, tasks


api_router = APIRouter()
api_router.include_router(health.router, tags=["health"])
api_router.include_router(settings.router, prefix="/settings", tags=["settings"])
api_router.include_router(providers.router, prefix="/providers", tags=["providers"])
api_router.include_router(sessions.router, prefix="/sessions", tags=["sessions"])
api_router.include_router(tasks.router, prefix="/tasks", tags=["tasks"])
api_router.include_router(agents.router, prefix="/agents", tags=["agents"])
api_router.include_router(skills.router, prefix="/skills", tags=["skills"])
api_router.include_router(files.router, prefix="/files", tags=["files"])

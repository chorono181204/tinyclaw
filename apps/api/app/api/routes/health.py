from fastapi import APIRouter, Depends

from app.api.deps import get_app_settings
from app.core.config import Settings
from app.schemas.health import HealthResponse
from app.services.health import HealthService


router = APIRouter()


@router.get("/health", response_model=HealthResponse)
def get_health(
    settings: Settings = Depends(get_app_settings),
) -> HealthResponse:
    service = HealthService(settings=settings)
    return service.get_status()

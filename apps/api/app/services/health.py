from app.core.config import Settings
from app.schemas.health import HealthResponse


class HealthService:
    def __init__(self, settings: Settings) -> None:
        self.settings = settings

    def get_status(self) -> HealthResponse:
        return HealthResponse(
            status="ok",
            app_name=self.settings.app_name,
            environment=self.settings.environment,
        )

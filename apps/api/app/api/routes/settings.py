from fastapi import APIRouter

from app.schemas.settings import SettingsResponse, SettingsUpdateRequest
from app.services.settings_service import get_settings_overview, update_chat_defaults

router = APIRouter()


@router.get("", response_model=SettingsResponse)
def get_settings() -> SettingsResponse:
    return get_settings_overview()


@router.put("", response_model=SettingsResponse)
def update_settings(payload: SettingsUpdateRequest) -> SettingsResponse:
    return update_chat_defaults(
        provider_id=payload.chat_defaults.provider_id,
        model=payload.chat_defaults.model,
    )

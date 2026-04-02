from __future__ import annotations

from app.repositories.settings_repository import read_store, write_store
from app.schemas.settings import ChatDefaults, RuntimeSummary, SettingsResponse
from app.services.provider_service import list_chat_model_options


def get_settings_overview() -> SettingsResponse:
    store = read_store()
    chat_defaults = store.get("chat_defaults") or {}
    model_options = list_chat_model_options()
    return SettingsResponse(
        chat_defaults=ChatDefaults(
            provider_id=chat_defaults.get("provider_id"),
            model=chat_defaults.get("model"),
        ),
        runtime=RuntimeSummary(
            ready_models=len([item for item in model_options if item.ready]),
            total_models=len(model_options),
        ),
    )


def update_chat_defaults(provider_id: str | None, model: str | None) -> SettingsResponse:
    store = read_store()
    store["chat_defaults"] = {
        "provider_id": provider_id,
        "model": model,
    }
    write_store(store)
    return get_settings_overview()

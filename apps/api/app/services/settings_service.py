from __future__ import annotations

from app.repositories.settings_repository import read_store, write_store
from app.schemas.settings import (
    ChatDefaults,
    OnboardingSummary,
    RuntimeSummary,
    SettingsResponse,
)
from app.services.provider_service import list_chat_model_options


def get_settings_overview() -> SettingsResponse:
    store = read_store()
    chat_defaults = store.get("chat_defaults") or {}
    model_options = list_chat_model_options()
    ready_models = [item for item in model_options if item.ready]
    matching_default = next(
        (
            item
            for item in ready_models
            if item.provider_id == chat_defaults.get("provider_id")
            and item.model == chat_defaults.get("model")
        ),
        None,
    )
    return SettingsResponse(
        chat_defaults=ChatDefaults(
            provider_id=chat_defaults.get("provider_id"),
            model=chat_defaults.get("model"),
        ),
        runtime=RuntimeSummary(
            ready_models=len(ready_models),
            total_models=len(model_options),
        ),
        onboarding=OnboardingSummary(
            complete=matching_default is not None,
            needs_provider_setup=len(ready_models) == 0,
            needs_default_model=matching_default is None,
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

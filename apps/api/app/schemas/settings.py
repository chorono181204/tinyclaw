from pydantic import BaseModel


class ChatDefaults(BaseModel):
    provider_id: str | None = None
    model: str | None = None


class RuntimeSummary(BaseModel):
    ready_models: int = 0
    total_models: int = 0


class OnboardingSummary(BaseModel):
    complete: bool = False
    needs_provider_setup: bool = True
    needs_default_model: bool = True


class SettingsResponse(BaseModel):
    chat_defaults: ChatDefaults
    runtime: RuntimeSummary
    onboarding: OnboardingSummary


class SettingsUpdateRequest(BaseModel):
    chat_defaults: ChatDefaults

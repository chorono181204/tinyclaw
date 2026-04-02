from pydantic import BaseModel


class ChatDefaults(BaseModel):
    provider_id: str | None = None
    model: str | None = None


class RuntimeSummary(BaseModel):
    ready_models: int = 0
    total_models: int = 0


class SettingsResponse(BaseModel):
    chat_defaults: ChatDefaults
    runtime: RuntimeSummary


class SettingsUpdateRequest(BaseModel):
    chat_defaults: ChatDefaults

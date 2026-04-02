from pydantic import BaseModel


class ChatDefaults(BaseModel):
    provider_id: str | None = None
    model: str | None = None


class SettingsResponse(BaseModel):
    chat_defaults: ChatDefaults


class SettingsUpdateRequest(BaseModel):
    chat_defaults: ChatDefaults

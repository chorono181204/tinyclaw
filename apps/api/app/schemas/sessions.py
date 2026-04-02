from __future__ import annotations

from pydantic import BaseModel, Field


class SessionItem(BaseModel):
    id: str
    title: str
    created_at: str
    updated_at: str
    archived_at: str | None = None
    last_message_preview: str | None = None
    message_count: int = 0


class SessionListResponse(BaseModel):
    items: list[SessionItem]


class SessionCreateRequest(BaseModel):
    title: str | None = None


class SessionCreateResponse(BaseModel):
    item: SessionItem


class SessionMessage(BaseModel):
    id: str
    role: str
    content: str
    created_at: str


class SessionMessagesResponse(BaseModel):
    session: SessionItem
    messages: list[SessionMessage]


class SessionUpdateRequest(BaseModel):
    title: str | None = None
    archived: bool | None = None


class SessionUpdateResponse(BaseModel):
    item: SessionItem


class SessionSendRequest(BaseModel):
    message: str = Field(min_length=1)
    provider_id: str | None = None
    model: str | None = None

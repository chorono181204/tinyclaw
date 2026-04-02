from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse

from app.schemas.sessions import (
    SessionCreateRequest,
    SessionCreateResponse,
    SessionListResponse,
    SessionMessagesResponse,
    SessionSendRequest,
)
from app.services.session_service import (
    create_session,
    get_session_with_messages,
    list_sessions,
    stream_session_reply,
)

router = APIRouter()


@router.get("", response_model=SessionListResponse)
def list_session_items() -> SessionListResponse:
    return SessionListResponse(items=list_sessions())


@router.post("", response_model=SessionCreateResponse)
def create_session_item(payload: SessionCreateRequest) -> SessionCreateResponse:
    return SessionCreateResponse(item=create_session(payload.title))


@router.get("/{session_id}", response_model=SessionMessagesResponse)
def get_session(session_id: str) -> SessionMessagesResponse:
    try:
        session, messages = get_session_with_messages(session_id)
    except KeyError as error:
        raise HTTPException(status_code=404, detail="Session not found") from error
    return SessionMessagesResponse(session=session, messages=messages)


@router.post("/{session_id}/send")
def send_message(session_id: str, payload: SessionSendRequest) -> StreamingResponse:
    try:
        get_session_with_messages(session_id)
    except KeyError as error:
        raise HTTPException(status_code=404, detail="Session not found") from error
    stream = stream_session_reply(
        session_id=session_id,
        message=payload.message,
        model=payload.model,
    )
    return StreamingResponse(stream, media_type="text/event-stream")

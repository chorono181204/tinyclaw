from fastapi import APIRouter, HTTPException, Query, Response
from fastapi.responses import StreamingResponse

from app.schemas.sessions import (
    SessionCreateRequest,
    SessionCreateResponse,
    SessionListResponse,
    SessionMessagesResponse,
    SessionSendRequest,
    SessionUpdateRequest,
    SessionUpdateResponse,
)
from app.services.session_service import (
    create_session,
    delete_session,
    get_session_with_messages,
    list_sessions,
    stream_session_reply,
    update_session,
)

router = APIRouter()


@router.get("", response_model=SessionListResponse)
def list_session_items(
    include_archived: bool = Query(default=False),
) -> SessionListResponse:
    return SessionListResponse(items=list_sessions(include_archived=include_archived))


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


@router.patch("/{session_id}", response_model=SessionUpdateResponse)
def patch_session(
    session_id: str,
    payload: SessionUpdateRequest,
) -> SessionUpdateResponse:
    try:
        item = update_session(
            session_id,
            title=payload.title,
            archived=payload.archived,
        )
    except KeyError as error:
        raise HTTPException(status_code=404, detail="Session not found") from error
    return SessionUpdateResponse(item=item)


@router.delete("/{session_id}", status_code=204)
def remove_session(session_id: str) -> Response:
    try:
        delete_session(session_id)
    except KeyError as error:
        raise HTTPException(status_code=404, detail="Session not found") from error
    except ValueError as error:
        raise HTTPException(status_code=400, detail="Default session cannot be deleted") from error
    return Response(status_code=204)


@router.post("/{session_id}/send")
def send_message(session_id: str, payload: SessionSendRequest) -> StreamingResponse:
    try:
        get_session_with_messages(session_id)
    except KeyError as error:
        raise HTTPException(status_code=404, detail="Session not found") from error
    stream = stream_session_reply(
        session_id=session_id,
        message=payload.message,
        provider_id=payload.provider_id,
        model=payload.model,
    )
    return StreamingResponse(stream, media_type="text/event-stream")

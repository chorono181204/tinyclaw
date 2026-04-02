from __future__ import annotations

import json
from datetime import UTC, datetime
from typing import Any, Generator
from uuid import uuid4

from app.repositories.session_repository import read_store, write_store
from app.schemas.sessions import SessionItem, SessionMessage


def _now_iso() -> str:
    return datetime.now(UTC).isoformat()


def _truncate(value: str, limit: int = 96) -> str:
    trimmed = value.strip()
    if len(trimmed) <= limit:
        return trimmed
    return f"{trimmed[:limit - 1]}…"


def _message_to_schema(message: dict[str, Any]) -> SessionMessage:
    return SessionMessage(**message)


def _session_to_schema(session: dict[str, Any]) -> SessionItem:
    messages = session.get("messages", [])
    last_message = messages[-1]["content"] if messages else None
    return SessionItem(
        id=session["id"],
        title=session["title"],
        created_at=session["created_at"],
        updated_at=session["updated_at"],
        last_message_preview=_truncate(last_message) if last_message else None,
        message_count=len(messages),
    )


def _ensure_default_session(store: dict[str, list[dict[str, Any]]]) -> dict[str, Any]:
    if store["sessions"]:
        return store["sessions"][0]
    session = {
        "id": "main",
        "title": "main",
        "created_at": _now_iso(),
        "updated_at": _now_iso(),
        "messages": [],
    }
    store["sessions"].append(session)
    write_store(store)
    return session


def list_sessions() -> list[SessionItem]:
    store = read_store()
    _ensure_default_session(store)
    sessions = sorted(store["sessions"], key=lambda item: item["updated_at"], reverse=True)
    return [_session_to_schema(session) for session in sessions]


def create_session(title: str | None) -> SessionItem:
    store = read_store()
    name = (title or "").strip() or f"chat-{len(store['sessions']) + 1}"
    session = {
        "id": f"session-{uuid4().hex[:12]}",
        "title": name,
        "created_at": _now_iso(),
        "updated_at": _now_iso(),
        "messages": [],
    }
    store["sessions"].append(session)
    write_store(store)
    return _session_to_schema(session)


def get_session_with_messages(session_id: str) -> tuple[SessionItem, list[SessionMessage]]:
    store = read_store()
    _ensure_default_session(store)
    session = next((item for item in store["sessions"] if item["id"] == session_id), None)
    if session is None:
        raise KeyError(session_id)
    messages = [_message_to_schema(message) for message in session.get("messages", [])]
    return _session_to_schema(session), messages


def _build_mock_response(message: str) -> tuple[list[dict[str, str]], str]:
    lowered = message.lower()
    if "trello" in lowered:
        tools = [
            {
                "detail": "with from skills/trello/SKILL.md",
                "kind": "read",
                "summary": "1 tool read",
            },
            {
                "detail": 'with if [ -n "$TRELLO_API_KEY" ] && [ -n "$TRELLO_TOKEN" ]; then echo ready; else echo missing; fi',
                "kind": "exec",
                "summary": "1 tool exec",
            },
        ]
        response = (
            "Ducky checked the Trello skill first, then verified the expected environment keys. "
            "The runtime is still missing `TRELLO_API_KEY` and `TRELLO_TOKEN`, so it cannot call the Trello API yet. "
            "Add those credentials in Config and send the request again."
        )
        return tools, response

    tools = [
        {
            "detail": "with list files in skills, `ls skills`",
            "kind": "exec",
            "summary": "1 tool exec",
        }
    ]
    response = (
        f"Ducky received: \"{message.strip()}\". "
        "This first runtime slice is streaming through the local session service, so the UI now behaves like a real chat workspace. "
        "The next step is replacing this mocked response path with provider-backed model execution."
    )
    return tools, response


def stream_session_reply(session_id: str, message: str, model: str | None = None) -> Generator[str, None, None]:
    store = read_store()
    _ensure_default_session(store)
    session = next((item for item in store["sessions"] if item["id"] == session_id), None)
    if session is None:
        raise KeyError(session_id)

    user_message = {
        "id": f"msg-{uuid4().hex[:12]}",
        "role": "user",
        "content": message.strip(),
        "created_at": _now_iso(),
    }
    session["messages"].append(user_message)
    session["updated_at"] = _now_iso()
    write_store(store)

    run_id = f"run-{uuid4().hex[:12]}"
    yield _sse("started", {"run_id": run_id, "session_id": session_id, "message": user_message})

    tool_items, assistant_text = _build_mock_response(message)
    for tool in tool_items:
        tool_id = f"tool-{uuid4().hex[:10]}"
        started = {"id": tool_id, **tool, "status": "running"}
        yield _sse("tool_started", started)
        finished = {"id": tool_id, **tool, "status": "completed"}
        yield _sse("tool_finished", finished)

    cursor = 0
    chunk_size = 28
    while cursor < len(assistant_text):
        chunk = assistant_text[cursor : cursor + chunk_size]
        cursor += chunk_size
        yield _sse("message_delta", {"run_id": run_id, "delta": chunk})

    assistant_message = {
        "id": f"msg-{uuid4().hex[:12]}",
        "role": "assistant",
        "content": assistant_text,
        "created_at": _now_iso(),
    }
    session["messages"].append(assistant_message)
    session["updated_at"] = _now_iso()
    write_store(store)

    yield _sse(
        "done",
        {
            "run_id": run_id,
            "model": model,
            "message": assistant_message,
            "session": _session_to_schema(session).model_dump(),
        },
    )


def _sse(event: str, payload: dict[str, Any]) -> str:
    return f"event: {event}\ndata: {json.dumps(payload)}\n\n"

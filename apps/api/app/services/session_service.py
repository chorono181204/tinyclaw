from __future__ import annotations

import json
from datetime import UTC, datetime
from typing import Any, Generator
from uuid import uuid4

from app.repositories.session_repository import read_store, write_store
from app.schemas.sessions import SessionItem, SessionMessage
from app.services.model_runtime_service import complete_chat
from app.services.tool_service import list_tool_catalog


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
        archived_at=session.get("archived_at"),
        last_message_preview=_truncate(last_message) if last_message else None,
        message_count=len(messages),
    )


def _ensure_default_session(store: dict[str, list[dict[str, Any]]]) -> dict[str, Any]:
    existing_main = next((item for item in store["sessions"] if item["id"] == "main"), None)
    if existing_main is not None:
        return existing_main
    session = {
        "id": "main",
        "title": "main",
        "created_at": _now_iso(),
        "updated_at": _now_iso(),
        "archived_at": None,
        "messages": [],
    }
    store["sessions"].append(session)
    write_store(store)
    return session


def list_sessions(include_archived: bool = False) -> list[SessionItem]:
    store = read_store()
    _ensure_default_session(store)
    sessions = store["sessions"]
    if not include_archived:
        sessions = [item for item in sessions if item.get("archived_at") is None]
    sessions = sorted(sessions, key=lambda item: item["updated_at"], reverse=True)
    return [_session_to_schema(session) for session in sessions]


def create_session(title: str | None) -> SessionItem:
    store = read_store()
    name = (title or "").strip() or f"chat-{len(store['sessions']) + 1}"
    session = {
        "id": f"session-{uuid4().hex[:12]}",
        "title": name,
        "created_at": _now_iso(),
        "updated_at": _now_iso(),
        "archived_at": None,
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


def update_session(
    session_id: str,
    *,
    title: str | None = None,
    archived: bool | None = None,
) -> SessionItem:
    store = read_store()
    _ensure_default_session(store)
    session = next((item for item in store["sessions"] if item["id"] == session_id), None)
    if session is None:
        raise KeyError(session_id)

    if title is not None:
        session["title"] = title.strip() or session["title"]

    if archived is not None:
        session["archived_at"] = _now_iso() if archived else None

    session["updated_at"] = _now_iso()
    write_store(store)
    return _session_to_schema(session)


def delete_session(session_id: str) -> None:
    if session_id == "main":
        raise ValueError("main")

    store = read_store()
    _ensure_default_session(store)
    original_count = len(store["sessions"])
    store["sessions"] = [item for item in store["sessions"] if item["id"] != session_id]
    if len(store["sessions"]) == original_count:
        raise KeyError(session_id)
    write_store(store)


def stream_session_reply(
    session_id: str,
    message: str,
    provider_id: str | None = None,
    model: str | None = None,
) -> Generator[str, None, None]:
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

    conversation_messages = [
        {"role": item["role"], "content": item["content"]}
        for item in session["messages"]
        if item["id"] != user_message["id"]
    ]
    conversation_messages.append({"role": "user", "content": user_message["content"]})

    tool_catalog = {item.id: item for item in list_tool_catalog()}

    memory_tool_id = f"tool-{uuid4().hex[:10]}"
    memory_tool = tool_catalog["session-memory"]
    memory_detail = f"with {max(len(conversation_messages) - 1, 0)} earlier messages in session context"
    yield _sse(
        "tool_started",
        {
            "id": memory_tool_id,
            "tool_id": memory_tool.id,
            "tool_name": memory_tool.name,
            "detail": memory_detail,
            "kind": memory_tool.category,
            "summary": "1 tool read",
            "status": "running",
        },
    )
    yield _sse(
        "tool_finished",
        {
            "id": memory_tool_id,
            "tool_id": memory_tool.id,
            "tool_name": memory_tool.name,
            "detail": memory_detail,
            "kind": memory_tool.category,
            "summary": "1 tool read",
            "status": "completed",
            "result_summary": "Prepared local session context",
        },
    )

    provider_tool_id = f"tool-{uuid4().hex[:10]}"
    provider_tool = tool_catalog["provider-completion"]
    provider_label = provider_id or "provider"
    runtime_model = model or "default model"
    provider_detail = f"with {provider_label} completion request for {runtime_model}"
    yield _sse(
        "tool_started",
        {
            "id": provider_tool_id,
            "tool_id": provider_tool.id,
            "tool_name": provider_tool.name,
            "detail": provider_detail,
            "kind": provider_tool.category,
            "summary": "1 tool exec",
            "status": "running",
        },
    )

    assistant_text = complete_chat(
        provider_id=provider_id,
        model=model,
        messages=conversation_messages,
    )

    yield _sse(
        "tool_finished",
        {
            "id": provider_tool_id,
            "tool_id": provider_tool.id,
            "tool_name": provider_tool.name,
            "detail": provider_detail,
            "kind": provider_tool.category,
            "summary": "1 tool exec",
            "status": "completed",
            "result_summary": f"Returned {len(assistant_text)} characters",
        },
    )

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

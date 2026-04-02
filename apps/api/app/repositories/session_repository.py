from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from app.core.config import get_settings


def _store_path() -> Path:
    path = get_settings().session_store_path
    path.parent.mkdir(parents=True, exist_ok=True)
    return path


def _empty_store() -> dict[str, list[dict[str, Any]]]:
    return {"sessions": []}


def read_store() -> dict[str, list[dict[str, Any]]]:
    path = _store_path()
    if not path.exists():
        return _empty_store()
    try:
        payload = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return _empty_store()

    sessions = payload.get("sessions")
    if not isinstance(sessions, list):
        return _empty_store()
    return {"sessions": sessions}


def write_store(store: dict[str, list[dict[str, Any]]]) -> None:
    _store_path().write_text(json.dumps(store, indent=2), encoding="utf-8")

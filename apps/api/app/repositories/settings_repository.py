from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from app.core.config import get_settings


def _store_path() -> Path:
    path = get_settings().app_settings_store_path
    path.parent.mkdir(parents=True, exist_ok=True)
    return path


def read_store() -> dict[str, Any]:
    path = _store_path()
    if not path.exists():
        return {}
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return {}


def write_store(items: dict[str, Any]) -> None:
    _store_path().write_text(json.dumps(items, indent=2), encoding="utf-8")

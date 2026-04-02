from pathlib import Path

import pytest
from fastapi.testclient import TestClient

from app.core.config import get_settings
from app.main import create_app


@pytest.fixture
def client(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> TestClient:
    monkeypatch.setenv("TINYCLAW_PROVIDER_STORE_PATH", str(tmp_path / "providers.json"))
    monkeypatch.setenv("TINYCLAW_SESSION_STORE_PATH", str(tmp_path / "sessions.json"))
    get_settings.cache_clear()
    app = create_app()
    with TestClient(app) as test_client:
        yield test_client
    get_settings.cache_clear()

import pytest
from fastapi.testclient import TestClient

from app.services import provider_service


def test_list_providers_returns_builtins(client: TestClient) -> None:
    response = client.get("/providers")

    assert response.status_code == 200
    payload = response.json()
    assert len(payload["items"]) == 16
    assert payload["items"][0]["id"] == "anthropic"


def test_list_chat_models_returns_supported_catalog(client: TestClient) -> None:
    response = client.get("/providers/models")

    assert response.status_code == 200
    payload = response.json()
    assert len(payload["items"]) == 8
    assert payload["items"][0]["provider_id"] == "anthropic"
    assert payload["items"][0]["model"] == "claude-3-7-sonnet-latest"


def test_update_provider_persists_api_key(client: TestClient) -> None:
    save_response = client.put("/providers/openai", json={"api_key": "sk-test-12345678"})

    assert save_response.status_code == 200
    assert save_response.json()["item"]["has_api_key"] is True

    list_response = client.get("/providers")
    item = next(entry for entry in list_response.json()["items"] if entry["id"] == "openai")
    assert item["masked_api_key"].startswith("sk-t")


def test_update_provider_can_clear_api_key(client: TestClient) -> None:
    client.put("/providers/anthropic", json={"api_key": "sk-ant-test-12345678"})

    response = client.put("/providers/anthropic", json={"api_key": ""})

    assert response.status_code == 200
    assert response.json()["item"]["has_api_key"] is False


def test_update_provider_404_for_unknown_provider(client: TestClient) -> None:
    response = client.put("/providers/unknown", json={"api_key": "test"})

    assert response.status_code == 404


def test_create_custom_provider_persists_entry(client: TestClient) -> None:
    response = client.post(
        "/providers",
        json={
            "name": "My Router",
            "base_url": "https://router.example.com/v1",
            "api_key": "mr-123456789",
        },
    )

    assert response.status_code == 200
    item = response.json()["item"]
    assert item["is_custom"] is True
    assert item["base_url"] == "https://router.example.com/v1"

    list_response = client.get("/providers")
    assert any(entry["id"] == item["id"] for entry in list_response.json()["items"])


def test_test_provider_connection_requires_api_key_for_required_provider(
    client: TestClient,
) -> None:
    response = client.post("/providers/openai/test")

    assert response.status_code == 200
    assert response.json() == {
        "ok": False,
        "message": "Add an API key before running a connection test.",
        "status_code": None,
    }


def test_test_provider_connection_succeeds_for_builtin_provider(
    client: TestClient,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    client.put("/providers/openai", json={"api_key": "sk-test-12345678"})

    class FakeResponse:
        status_code = 200

    class FakeClient:
        def __init__(self, *args, **kwargs) -> None:
            self.args = args
            self.kwargs = kwargs

        def __enter__(self) -> "FakeClient":
            return self

        def __exit__(self, exc_type, exc, tb) -> bool:
            return False

        def get(self, url: str, headers: dict[str, str] | None = None) -> FakeResponse:
            assert url == "https://api.openai.com/v1/models"
            assert headers == {"Authorization": "Bearer sk-test-12345678"}
            return FakeResponse()

    monkeypatch.setattr(provider_service.httpx, "Client", FakeClient)

    response = client.post("/providers/openai/test")

    assert response.status_code == 200
    assert response.json() == {
        "ok": True,
        "message": "Connection looks good (200).",
        "status_code": 200,
    }


def test_test_provider_connection_supports_custom_provider_without_api_key(
    client: TestClient,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    create_response = client.post(
        "/providers",
        json={
            "name": "Local Gateway",
            "base_url": "http://localhost:9000/v1",
            "api_key": "",
        },
    )
    provider_id = create_response.json()["item"]["id"]

    class FakeResponse:
        status_code = 200

    class FakeClient:
        def __init__(self, *args, **kwargs) -> None:
            self.args = args
            self.kwargs = kwargs

        def __enter__(self) -> "FakeClient":
            return self

        def __exit__(self, exc_type, exc, tb) -> bool:
            return False

        def get(self, url: str, headers: dict[str, str] | None = None) -> FakeResponse:
            assert url == "http://localhost:9000/v1/models"
            assert headers == {}
            return FakeResponse()

    monkeypatch.setattr(provider_service.httpx, "Client", FakeClient)

    response = client.post(f"/providers/{provider_id}/test")

    assert response.status_code == 200
    assert response.json()["ok"] is True

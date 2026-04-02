import pytest
from fastapi.testclient import TestClient


def test_list_providers_returns_builtins(client: TestClient) -> None:
    response = client.get("/providers")

    assert response.status_code == 200
    payload = response.json()
    assert len(payload["items"]) == 16
    assert payload["items"][0]["id"] == "anthropic"


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

from fastapi.testclient import TestClient


def test_settings_defaults_start_empty(client: TestClient) -> None:
    response = client.get("/settings")

    assert response.status_code == 200
    assert response.json() == {
        "chat_defaults": {
            "provider_id": None,
            "model": None,
        }
    }


def test_settings_can_persist_chat_defaults(client: TestClient) -> None:
    update_response = client.put(
        "/settings",
        json={
            "chat_defaults": {
                "provider_id": "anthropic",
                "model": "claude-3-7-sonnet-latest",
            }
        },
    )

    assert update_response.status_code == 200
    assert update_response.json()["chat_defaults"]["provider_id"] == "anthropic"

    get_response = client.get("/settings")
    assert get_response.status_code == 200
    assert get_response.json()["chat_defaults"] == {
        "provider_id": "anthropic",
        "model": "claude-3-7-sonnet-latest",
    }

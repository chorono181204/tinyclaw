from fastapi.testclient import TestClient


def test_settings_defaults_start_empty(client: TestClient) -> None:
    response = client.get("/settings")

    assert response.status_code == 200
    assert response.json() == {
        "chat_defaults": {
            "provider_id": None,
            "model": None,
        },
        "onboarding": {
            "complete": False,
            "needs_provider_setup": True,
            "needs_default_model": True,
        },
        "runtime": {
            "ready_models": 0,
            "total_models": 8,
        },
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
    assert get_response.json()["onboarding"] == {
        "complete": False,
        "needs_provider_setup": True,
        "needs_default_model": True,
    }
    assert get_response.json()["runtime"]["total_models"] == 8


def test_onboarding_is_complete_when_ready_model_matches_default(client: TestClient) -> None:
    client.put("/providers/openai", json={"api_key": "sk-test-12345678"})
    response = client.put(
        "/settings",
        json={
            "chat_defaults": {
                "provider_id": "openai",
                "model": "gpt-4.1-mini",
            }
        },
    )

    assert response.status_code == 200
    assert response.json()["onboarding"] == {
        "complete": True,
        "needs_provider_setup": False,
        "needs_default_model": False,
    }

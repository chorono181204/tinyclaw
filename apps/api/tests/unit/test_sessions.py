import json

from fastapi.testclient import TestClient

from app.services import model_runtime_service


def test_list_sessions_bootstraps_main_session(client: TestClient) -> None:
    response = client.get("/sessions")

    assert response.status_code == 200
    payload = response.json()
    assert payload["items"][0]["id"] == "main"
    assert payload["items"][0]["title"] == "main"


def test_create_session_persists_entry(client: TestClient) -> None:
    response = client.post("/sessions", json={"title": "workspace"})

    assert response.status_code == 200
    item = response.json()["item"]
    assert item["title"] == "workspace"

    list_response = client.get("/sessions")
    assert any(entry["id"] == item["id"] for entry in list_response.json()["items"])


def test_archive_and_list_sessions(client: TestClient) -> None:
    created = client.post("/sessions", json={"title": "archive me"}).json()["item"]

    archive_response = client.patch(f"/sessions/{created['id']}", json={"archived": True})
    assert archive_response.status_code == 200
    assert archive_response.json()["item"]["archived_at"] is not None

    active_response = client.get("/sessions")
    assert all(item["id"] != created["id"] for item in active_response.json()["items"])

    all_response = client.get("/sessions", params={"include_archived": "true"})
    assert any(item["id"] == created["id"] for item in all_response.json()["items"])


def test_rename_and_delete_session(client: TestClient) -> None:
    created = client.post("/sessions", json={"title": "draft"}).json()["item"]

    rename_response = client.patch(f"/sessions/{created['id']}", json={"title": "review notes"})
    assert rename_response.status_code == 200
    assert rename_response.json()["item"]["title"] == "review notes"

    delete_response = client.delete(f"/sessions/{created['id']}")
    assert delete_response.status_code == 204

    list_response = client.get("/sessions", params={"include_archived": "true"})
    assert all(item["id"] != created["id"] for item in list_response.json()["items"])


def test_send_streams_events_and_persists_messages(client: TestClient) -> None:
    client.get("/sessions")

    with client.stream("POST", "/sessions/main/send", json={"message": "List my Trello boards"}) as response:
        assert response.status_code == 200
        body = "".join(chunk.decode("utf-8") if isinstance(chunk, bytes) else chunk for chunk in response.iter_text())

    assert "event: started" in body
    assert "event: tool_started" in body
    assert "event: tool_finished" in body
    assert "event: message_delta" in body
    assert "event: done" in body
    assert "\"tool_name\": \"Session memory\"" in body
    assert "\"tool_name\": \"Provider completion\"" in body

    done_payload = body.split("event: done\ndata: ", 1)[1].split("\n\n", 1)[0]
    parsed = json.loads(done_payload)
    assert parsed["message"]["role"] == "assistant"

    session_response = client.get("/sessions/main")
    messages = session_response.json()["messages"]
    assert messages[-2]["role"] == "user"
    assert messages[-1]["role"] == "assistant"


def test_send_uses_provider_backed_completion(
    client: TestClient,
    monkeypatch,
) -> None:
    client.put("/providers/openai", json={"api_key": "sk-test-12345678"})

    def fake_complete_chat(*, provider_id: str | None, model: str | None, messages: list[dict[str, str]]) -> str:
        assert provider_id == "openai"
        assert model == "gpt-4.1-mini"
        assert messages[-1]["content"] == "Hello from Ducky"
        return "Provider-backed answer"

    monkeypatch.setattr(model_runtime_service, "complete_chat", fake_complete_chat)
    monkeypatch.setattr("app.services.session_service.complete_chat", fake_complete_chat)

    with client.stream(
        "POST",
        "/sessions/main/send",
        json={
            "message": "Hello from Ducky",
            "model": "gpt-4.1-mini",
            "provider_id": "openai",
        },
    ) as response:
        assert response.status_code == 200
        body = "".join(chunk.decode("utf-8") if isinstance(chunk, bytes) else chunk for chunk in response.iter_text())

    assert "event: tool_started" in body
    assert "\"tool_name\": \"Provider completion\"" in body
    assert "event: done" in body
    assert "Provider-backed answer" in body

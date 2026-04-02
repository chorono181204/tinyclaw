import json

from fastapi.testclient import TestClient


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


def test_send_streams_events_and_persists_messages(client: TestClient) -> None:
    client.get("/sessions")

    with client.stream("POST", "/sessions/main/send", json={"message": "List my Trello boards"}) as response:
        assert response.status_code == 200
        body = "".join(chunk.decode("utf-8") if isinstance(chunk, bytes) else chunk for chunk in response.iter_text())

    assert "event: started" in body
    assert "event: tool_started" in body
    assert "event: message_delta" in body
    assert "event: done" in body

    done_payload = body.split("event: done\ndata: ", 1)[1].split("\n\n", 1)[0]
    parsed = json.loads(done_payload)
    assert parsed["message"]["role"] == "assistant"

    session_response = client.get("/sessions/main")
    messages = session_response.json()["messages"]
    assert messages[-2]["role"] == "user"
    assert messages[-1]["role"] == "assistant"

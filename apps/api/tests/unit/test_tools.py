from fastapi.testclient import TestClient


def test_list_tools_returns_policy_surface(client: TestClient) -> None:
    response = client.get("/tools")

    assert response.status_code == 200
    payload = response.json()
    ids = {item["id"] for item in payload["items"]}
    assert "session-memory" in ids
    assert "provider-completion" in ids
    assert "workspace-commands" in ids

    provider_tool = next(item for item in payload["items"] if item["id"] == "provider-completion")
    assert provider_tool["enabled"] is False
    assert provider_tool["reason"]

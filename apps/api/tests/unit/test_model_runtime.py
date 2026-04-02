from app.services import model_runtime_service


def test_complete_chat_supports_anthropic(monkeypatch) -> None:
    def fake_get_provider_runtime(provider_id: str) -> dict[str, str]:
        assert provider_id == "anthropic"
        return {
            "name": "Anthropic",
            "base_url": "https://api.anthropic.com",
            "api_key": "sk-ant-test",
            "requires_api_key": True,
        }

    class FakeResponse:
        status_code = 200

        @staticmethod
        def json() -> dict[str, object]:
            return {
                "content": [
                    {"type": "text", "text": "Anthropic reply"},
                ]
            }

    class FakeClient:
        def __init__(self, *args, **kwargs) -> None:
            self.args = args
            self.kwargs = kwargs

        def __enter__(self) -> "FakeClient":
            return self

        def __exit__(self, exc_type, exc, tb) -> bool:
            return False

        def post(self, url: str, headers: dict[str, str], json: dict[str, object]) -> FakeResponse:
            assert url == "https://api.anthropic.com/v1/messages"
            assert headers["x-api-key"] == "sk-ant-test"
            assert json["model"] == "claude-3-7-sonnet-latest"
            return FakeResponse()

    monkeypatch.setattr(model_runtime_service, "get_provider_runtime", fake_get_provider_runtime)
    monkeypatch.setattr(model_runtime_service.httpx, "Client", FakeClient)

    response = model_runtime_service.complete_chat(
        provider_id="anthropic",
        model="claude-3-7-sonnet-latest",
        messages=[{"role": "user", "content": "Hello"}],
    )

    assert response == "Anthropic reply"


def test_complete_chat_supports_gemini(monkeypatch) -> None:
    def fake_get_provider_runtime(provider_id: str) -> dict[str, str]:
        assert provider_id == "google"
        return {
            "name": "Google Gemini",
            "base_url": "https://generativelanguage.googleapis.com/v1beta",
            "api_key": "AIza-test",
            "requires_api_key": True,
        }

    class FakeResponse:
        status_code = 200

        @staticmethod
        def json() -> dict[str, object]:
            return {
                "candidates": [
                    {
                        "content": {
                            "parts": [{"text": "Gemini reply"}],
                        }
                    }
                ]
            }

    class FakeClient:
        def __init__(self, *args, **kwargs) -> None:
            self.args = args
            self.kwargs = kwargs

        def __enter__(self) -> "FakeClient":
            return self

        def __exit__(self, exc_type, exc, tb) -> bool:
            return False

        def post(self, url: str, headers: dict[str, str], json: dict[str, object]) -> FakeResponse:
            assert url == (
                "https://generativelanguage.googleapis.com/v1beta"
                "/models/gemini-2.5-pro:generateContent?key=AIza-test"
            )
            assert headers["Content-Type"] == "application/json"
            return FakeResponse()

    monkeypatch.setattr(model_runtime_service, "get_provider_runtime", fake_get_provider_runtime)
    monkeypatch.setattr(model_runtime_service.httpx, "Client", FakeClient)

    response = model_runtime_service.complete_chat(
        provider_id="google",
        model="gemini-2.5-pro",
        messages=[{"role": "user", "content": "Hello"}],
    )

    assert response == "Gemini reply"

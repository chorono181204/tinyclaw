from __future__ import annotations

import httpx

from app.services.provider_service import get_provider_runtime

OPENAI_COMPATIBLE_PROVIDER_IDS = {
    "openai",
    "openrouter",
    "xai",
    "deepseek",
    "groq",
    "mistral",
    "perplexity",
    "moonshot",
    "together",
    "openai-compatible",
}


def complete_chat(
    *,
    provider_id: str | None,
    model: str | None,
    messages: list[dict[str, str]],
) -> str:
    if not provider_id:
        return (
            "Choose a provider-backed model before sending this message. "
            "Ducky is ready to call a real provider now, but it needs an explicit provider selection."
        )

    provider = get_provider_runtime(provider_id)
    runtime_model = (model or "").strip()
    if not runtime_model:
        return (
            f"{provider['name']} is selected, but no model was provided. "
            "Pick a model in the chat toolbar and send the message again."
        )

    if provider_id not in OPENAI_COMPATIBLE_PROVIDER_IDS:
        return (
            f"{provider['name']} is configured, but chat execution for this provider is not wired yet. "
            "Use an OpenAI-compatible provider for now, or keep this provider for settings and connection testing."
        )

    if provider.get("requires_api_key", True) and not provider.get("api_key"):
        return (
            f"{provider['name']} needs an API key before chat can run. "
            "Add the key in Config and try again."
        )

    base_url = provider["base_url"].rstrip("/")
    api_key = provider["api_key"]
    auth_scheme = provider.get("auth_scheme") or "bearer"

    headers = {"Content-Type": "application/json"}
    if auth_scheme in {"bearer", "bearer_optional"} and api_key:
        headers["Authorization"] = f"Bearer {api_key}"

    payload = {
        "model": runtime_model,
        "messages": messages,
    }

    timeout = httpx.Timeout(45.0, connect=10.0)
    try:
        with httpx.Client(timeout=timeout, follow_redirects=True) as client:
            response = client.post(
                f"{base_url}/chat/completions",
                headers=headers,
                json=payload,
            )
    except httpx.HTTPError as error:
        return f"Provider request failed before a response was returned: {error}"

    if response.status_code >= 400:
        return (
            f"{provider['name']} returned status {response.status_code}. "
            "Check the provider key, base URL, and selected model."
        )

    try:
        data = response.json()
        content = data["choices"][0]["message"]["content"]
    except (KeyError, IndexError, TypeError, ValueError):
        return (
            f"{provider['name']} responded, but the payload did not match the expected chat format. "
            "Check whether this endpoint is OpenAI-compatible."
        )

    if isinstance(content, list):
        text_parts = [part.get("text", "") for part in content if isinstance(part, dict)]
        normalized = "".join(text_parts).strip()
        return normalized or "The provider returned an empty response."

    normalized = str(content).strip()
    return normalized or "The provider returned an empty response."

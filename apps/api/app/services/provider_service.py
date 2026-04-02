from __future__ import annotations

import json
from pathlib import Path
import re
from typing import Any
from urllib.parse import urlencode

import httpx

from app.core.config import get_settings
from app.schemas.providers import ProviderConnectionTestResponse, ProviderItem

BUILTIN_PROVIDERS = [
    {
        "id": "anthropic",
        "name": "Anthropic",
        "description": "Claude models through the official Anthropic API.",
        "docs_url": "https://console.anthropic.com/settings/keys",
        "base_url": "https://api.anthropic.com",
        "api_key_label": "Anthropic API key",
        "api_key_placeholder": "sk-ant-...",
        "test_path": "/v1/models",
        "auth_scheme": "anthropic",
    },
    {
        "id": "openai",
        "name": "OpenAI",
        "description": "GPT models through the official OpenAI API.",
        "docs_url": "https://platform.openai.com/api-keys",
        "base_url": "https://api.openai.com/v1",
        "api_key_label": "OpenAI API key",
        "api_key_placeholder": "sk-...",
        "test_path": "/models",
        "auth_scheme": "bearer",
    },
    {
        "id": "google",
        "name": "Google Gemini",
        "description": "Gemini models through Google AI Studio.",
        "docs_url": "https://aistudio.google.com/app/apikey",
        "base_url": "https://generativelanguage.googleapis.com/v1beta",
        "api_key_label": "Google API key",
        "api_key_placeholder": "AIza...",
        "test_path": "/models",
        "auth_scheme": "query",
        "query_param_name": "key",
    },
    {
        "id": "xai",
        "name": "xAI",
        "description": "Grok models hosted by xAI.",
        "docs_url": "https://console.x.ai/",
        "base_url": "https://api.x.ai/v1",
        "api_key_label": "xAI API key",
        "api_key_placeholder": "xai-...",
        "test_path": "/models",
        "auth_scheme": "bearer",
    },
    {
        "id": "deepseek",
        "name": "DeepSeek",
        "description": "DeepSeek chat and reasoning models.",
        "docs_url": "https://platform.deepseek.com/api_keys",
        "base_url": "https://api.deepseek.com/v1",
        "api_key_label": "DeepSeek API key",
        "api_key_placeholder": "sk-...",
        "test_path": "/models",
        "auth_scheme": "bearer",
    },
    {
        "id": "groq",
        "name": "Groq",
        "description": "Low-latency inference through GroqCloud.",
        "docs_url": "https://console.groq.com/keys",
        "base_url": "https://api.groq.com/openai/v1",
        "api_key_label": "Groq API key",
        "api_key_placeholder": "gsk_...",
        "test_path": "/models",
        "auth_scheme": "bearer",
    },
    {
        "id": "mistral",
        "name": "Mistral AI",
        "description": "Official Mistral platform models and endpoints.",
        "docs_url": "https://console.mistral.ai/api-keys/",
        "base_url": "https://api.mistral.ai/v1",
        "api_key_label": "Mistral API key",
        "api_key_placeholder": "mistral-...",
        "test_path": "/models",
        "auth_scheme": "bearer",
    },
    {
        "id": "cohere",
        "name": "Cohere",
        "description": "Command and embed models from Cohere.",
        "docs_url": "https://dashboard.cohere.com/api-keys",
        "base_url": "https://api.cohere.com/v1",
        "api_key_label": "Cohere API key",
        "api_key_placeholder": "co-...",
        "test_path": "/models",
        "auth_scheme": "bearer",
    },
    {
        "id": "openrouter",
        "name": "OpenRouter",
        "description": "Unified routing layer across many hosted model providers.",
        "docs_url": "https://openrouter.ai/keys",
        "base_url": "https://openrouter.ai/api/v1",
        "api_key_label": "OpenRouter API key",
        "api_key_placeholder": "sk-or-...",
        "test_path": "/models",
        "auth_scheme": "bearer",
    },
    {
        "id": "perplexity",
        "name": "Perplexity",
        "description": "Perplexity-hosted chat and search-oriented models.",
        "docs_url": "https://www.perplexity.ai/settings/api",
        "base_url": "https://api.perplexity.ai",
        "api_key_label": "Perplexity API key",
        "api_key_placeholder": "pplx-...",
        "test_path": "/models",
        "auth_scheme": "bearer",
    },
    {
        "id": "ollama",
        "name": "Ollama",
        "description": "Local or self-hosted models through an Ollama-compatible endpoint.",
        "docs_url": "https://ollama.com/",
        "base_url": "http://127.0.0.1:11434",
        "api_key_label": "Ollama API key",
        "api_key_placeholder": "Optional",
        "requires_api_key": False,
        "test_path": "/api/tags",
        "auth_scheme": "none",
    },
    {
        "id": "minimax",
        "name": "MiniMax",
        "description": "MiniMax-hosted text and multimodal models.",
        "docs_url": "https://platform.minimaxi.com/user-center/basic-information/interface-key",
        "base_url": "https://api.minimax.chat/v1",
        "api_key_label": "MiniMax API key",
        "api_key_placeholder": "minimax-...",
        "test_path": "/models",
        "auth_scheme": "bearer",
    },
    {
        "id": "moonshot",
        "name": "Moonshot",
        "description": "Moonshot AI endpoints including Kimi-hosted models.",
        "docs_url": "https://platform.moonshot.ai/console/api-keys",
        "base_url": "https://api.moonshot.ai/v1",
        "api_key_label": "Moonshot API key",
        "api_key_placeholder": "sk-...",
        "test_path": "/models",
        "auth_scheme": "bearer",
    },
    {
        "id": "together",
        "name": "Together",
        "description": "Hosted open-weight models through Together AI.",
        "docs_url": "https://api.together.ai/settings/api-keys",
        "base_url": "https://api.together.xyz/v1",
        "api_key_label": "Together API key",
        "api_key_placeholder": "together-...",
        "test_path": "/models",
        "auth_scheme": "bearer",
    },
    {
        "id": "azure-openai",
        "name": "Azure OpenAI",
        "description": "Azure-hosted OpenAI deployments for enterprise environments.",
        "docs_url": "https://portal.azure.com/",
        "base_url": None,
        "api_key_label": "Azure OpenAI API key",
        "api_key_placeholder": "azure-...",
        "test_path": None,
        "auth_scheme": "unsupported",
    },
    {
        "id": "openai-compatible",
        "name": "OpenAI-compatible",
        "description": "Any provider exposing an OpenAI-compatible API surface.",
        "docs_url": "https://platform.openai.com/docs/api-reference",
        "base_url": None,
        "api_key_label": "Compatible API key",
        "api_key_placeholder": "Optional",
        "requires_api_key": False,
        "test_path": "/models",
        "auth_scheme": "bearer_optional",
    },
]


def _slugify(value: str) -> str:
    normalized = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return normalized or "custom-provider"


def _mask_api_key(api_key: str) -> str:
    trimmed = api_key.strip()
    if len(trimmed) <= 8:
        return "•" * len(trimmed)
    return f"{trimmed[:4]}{'•' * (len(trimmed) - 8)}{trimmed[-4:]}"


def _store_path() -> Path:
    path = get_settings().provider_store_path
    path.parent.mkdir(parents=True, exist_ok=True)
    return path


def _empty_store() -> dict[str, Any]:
    return {"keys": {}, "custom_providers": []}


def _read_store() -> dict[str, Any]:
    path = _store_path()
    if not path.exists():
        return _empty_store()
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return _empty_store()

    if "keys" in data and "custom_providers" in data:
        data["keys"] = data.get("keys") or {}
        data["custom_providers"] = data.get("custom_providers") or []
        return data

    if isinstance(data, dict):
        return {"keys": data, "custom_providers": []}

    return _empty_store()


def _write_store(items: dict[str, Any]) -> None:
    path = _store_path()
    path.write_text(json.dumps(items, indent=2), encoding="utf-8")


def _provider_to_item(provider: dict[str, Any], api_key: str, *, is_custom: bool = False) -> ProviderItem:
    return ProviderItem(
        **{key: value for key, value in provider.items() if key in ProviderItem.model_fields},
        is_custom=is_custom,
        has_api_key=bool(api_key),
        masked_api_key=_mask_api_key(api_key) if api_key else None,
    )


def list_provider_items() -> list[ProviderItem]:
    store = _read_store()
    saved_keys = store["keys"]
    items: list[ProviderItem] = []
    for provider in BUILTIN_PROVIDERS:
        api_key = saved_keys.get(provider["id"], "").strip()
        items.append(_provider_to_item(provider, api_key))

    for provider in store["custom_providers"]:
        api_key = saved_keys.get(provider["id"], "").strip()
        items.append(_provider_to_item(provider, api_key, is_custom=True))

    return items


def update_provider_api_key(provider_id: str, api_key: str) -> ProviderItem:
    store = _read_store()
    provider = next((item for item in BUILTIN_PROVIDERS if item["id"] == provider_id), None)
    is_custom = False
    if provider is None:
        provider = next(
            (item for item in store["custom_providers"] if item["id"] == provider_id), None
        )
        is_custom = provider is not None
    if provider is None:
        raise KeyError(provider_id)

    saved_keys = store["keys"]
    normalized_key = api_key.strip()
    if normalized_key:
        saved_keys[provider_id] = normalized_key
    else:
        saved_keys.pop(provider_id, None)
    _write_store(store)

    return _provider_to_item(provider, normalized_key, is_custom=is_custom)


def create_custom_provider(name: str, base_url: str, api_key: str) -> ProviderItem:
    store = _read_store()
    existing_ids = {item["id"] for item in BUILTIN_PROVIDERS} | {
        item["id"] for item in store["custom_providers"]
    }

    base_id = _slugify(name)
    provider_id = base_id
    suffix = 2
    while provider_id in existing_ids:
        provider_id = f"{base_id}-{suffix}"
        suffix += 1

    provider = {
        "id": provider_id,
        "name": name.strip(),
        "description": base_url.strip(),
        "docs_url": "",
        "base_url": base_url.strip(),
        "api_key_label": f"{name.strip()} API key",
        "api_key_placeholder": "sk-...",
        "requires_api_key": False,
        "test_path": "/models",
        "auth_scheme": "bearer_optional",
    }
    store["custom_providers"].append(provider)

    normalized_key = api_key.strip()
    if normalized_key:
        store["keys"][provider_id] = normalized_key

    _write_store(store)
    return _provider_to_item(provider, normalized_key, is_custom=True)


def get_provider_runtime(provider_id: str) -> dict[str, Any]:
    store = _read_store()
    provider = next((item for item in BUILTIN_PROVIDERS if item["id"] == provider_id), None)
    is_custom = False
    if provider is None:
        provider = next((item for item in store["custom_providers"] if item["id"] == provider_id), None)
        is_custom = provider is not None
    if provider is None:
        raise KeyError(provider_id)

    api_key = (store["keys"].get(provider_id) or "").strip()
    return {
        **provider,
        "api_key": api_key,
        "is_custom": is_custom,
    }


def test_provider_connection(provider_id: str) -> ProviderConnectionTestResponse:
    store = _read_store()
    provider = next((item for item in BUILTIN_PROVIDERS if item["id"] == provider_id), None)
    if provider is None:
        provider = next((item for item in store["custom_providers"] if item["id"] == provider_id), None)
    if provider is None:
        raise KeyError(provider_id)

    api_key = (store["keys"].get(provider_id) or "").strip()
    requires_api_key = provider.get("requires_api_key", True)
    if requires_api_key and not api_key:
        return ProviderConnectionTestResponse(
            ok=False,
            message="Add an API key before running a connection test.",
        )

    auth_scheme = provider.get("auth_scheme") or "bearer"
    if auth_scheme == "unsupported":
        return ProviderConnectionTestResponse(
            ok=False,
            message="This provider needs deployment-specific Azure details. Add it as a custom provider to test it.",
        )

    base_url = (provider.get("base_url") or "").rstrip("/")
    if not base_url:
        return ProviderConnectionTestResponse(
            ok=False,
            message="This provider needs a base URL before it can be tested.",
        )

    test_path = provider.get("test_path") or ""
    url = f"{base_url}{test_path}"
    headers: dict[str, str] = {}

    if auth_scheme == "bearer" and api_key:
        headers["Authorization"] = f"Bearer {api_key}"
    elif auth_scheme == "bearer_optional" and api_key:
        headers["Authorization"] = f"Bearer {api_key}"
    elif auth_scheme == "anthropic":
        headers["x-api-key"] = api_key
        headers["anthropic-version"] = "2023-06-01"

    if auth_scheme == "query" and api_key:
        query_key = provider.get("query_param_name") or "key"
        separator = "&" if "?" in url else "?"
        url = f"{url}{separator}{urlencode({query_key: api_key})}"

    timeout = httpx.Timeout(10.0, connect=5.0)
    with httpx.Client(timeout=timeout, follow_redirects=True) as client:
        try:
            response = client.get(url, headers=headers)
        except httpx.HTTPError as error:
            return ProviderConnectionTestResponse(
                ok=False,
                message=f"Connection failed: {error}",
            )

    if response.status_code < 400:
        return ProviderConnectionTestResponse(
            ok=True,
            message=f"Connection looks good ({response.status_code}).",
            status_code=response.status_code,
        )

    if response.status_code in {401, 403}:
        return ProviderConnectionTestResponse(
            ok=False,
            message=f"The endpoint responded, but the credentials were rejected ({response.status_code}).",
            status_code=response.status_code,
        )

    if response.status_code == 404 and test_path:
        return ProviderConnectionTestResponse(
            ok=False,
            message="The base URL responded, but the expected models endpoint was not found. Check the provider URL.",
            status_code=response.status_code,
        )

    return ProviderConnectionTestResponse(
        ok=False,
        message=f"Provider test failed with status {response.status_code}.",
        status_code=response.status_code,
    )

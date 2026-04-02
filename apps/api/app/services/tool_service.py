from __future__ import annotations

from app.schemas.tools import ToolCatalogItem
from app.services.provider_service import list_chat_model_options


def list_tool_catalog() -> list[ToolCatalogItem]:
    ready_models = [item for item in list_chat_model_options() if item.ready]
    provider_reason = None if ready_models else "Connect at least one provider-backed model in Config."

    return [
        ToolCatalogItem(
            id="session-memory",
            name="Session memory",
            description="Read the current conversation transcript before each reply.",
            category="read",
            enabled=True,
            reason=None,
        ),
        ToolCatalogItem(
            id="skills-catalog",
            name="Skills catalog",
            description="Inspect locally bundled skill metadata for task context.",
            category="read",
            enabled=True,
            reason=None,
        ),
        ToolCatalogItem(
            id="provider-completion",
            name="Provider completion",
            description="Send the final chat request to the active provider-backed model.",
            category="exec",
            enabled=bool(ready_models),
            reason=provider_reason,
        ),
        ToolCatalogItem(
            id="workspace-commands",
            name="Workspace commands",
            description="Run local shell or file actions after an explicit policy layer is added.",
            category="exec",
            enabled=False,
            reason="The local execution policy surface is not enabled yet.",
        ),
    ]

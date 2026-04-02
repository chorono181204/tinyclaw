from __future__ import annotations

from pydantic import BaseModel


class ToolCatalogItem(BaseModel):
    id: str
    name: str
    description: str
    category: str
    enabled: bool
    reason: str | None = None


class ToolCatalogResponse(BaseModel):
    items: list[ToolCatalogItem]

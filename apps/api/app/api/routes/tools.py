from fastapi import APIRouter

from app.schemas.tools import ToolCatalogResponse
from app.services.tool_service import list_tool_catalog

router = APIRouter()


@router.get("", response_model=ToolCatalogResponse)
def list_tools() -> ToolCatalogResponse:
    return ToolCatalogResponse(items=list_tool_catalog())

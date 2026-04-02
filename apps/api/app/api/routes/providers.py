from fastapi import APIRouter, HTTPException

from app.schemas.providers import (
    CustomProviderCreateRequest,
    CustomProviderCreateResponse,
    ProviderListResponse,
    ProviderUpdateRequest,
    ProviderUpdateResponse,
)
from app.services.provider_service import (
    create_custom_provider,
    list_provider_items,
    update_provider_api_key,
)

router = APIRouter()


@router.get("", response_model=ProviderListResponse)
def list_providers() -> ProviderListResponse:
    return ProviderListResponse(items=list_provider_items())


@router.post("", response_model=CustomProviderCreateResponse)
def create_provider(payload: CustomProviderCreateRequest) -> CustomProviderCreateResponse:
    item = create_custom_provider(
        name=payload.name,
        base_url=payload.base_url,
        api_key=payload.api_key,
    )
    return CustomProviderCreateResponse(item=item)


@router.put("/{provider_id}", response_model=ProviderUpdateResponse)
def update_provider(
    provider_id: str, payload: ProviderUpdateRequest
) -> ProviderUpdateResponse:
    try:
        item = update_provider_api_key(provider_id=provider_id, api_key=payload.api_key)
    except KeyError as error:
        raise HTTPException(status_code=404, detail="Provider not found") from error
    return ProviderUpdateResponse(item=item)

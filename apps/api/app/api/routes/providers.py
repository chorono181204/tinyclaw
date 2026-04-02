from fastapi import APIRouter, HTTPException

from app.schemas.providers import (
    CustomProviderCreateRequest,
    CustomProviderCreateResponse,
    ProviderConnectionTestResponse,
    ProviderListResponse,
    ProviderUpdateRequest,
    ProviderUpdateResponse,
)
from app.services.provider_service import (
    create_custom_provider,
    list_provider_items,
    test_provider_connection,
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


@router.post("/{provider_id}/test", response_model=ProviderConnectionTestResponse)
def test_provider(provider_id: str) -> ProviderConnectionTestResponse:
    try:
        return test_provider_connection(provider_id)
    except KeyError as error:
        raise HTTPException(status_code=404, detail="Provider not found") from error

from pydantic import BaseModel, Field


class ProviderItem(BaseModel):
    id: str
    name: str
    description: str
    docs_url: str
    base_url: str | None = None
    api_key_label: str
    api_key_placeholder: str
    requires_api_key: bool = True
    has_api_key: bool = False
    masked_api_key: str | None = None
    is_custom: bool = False


class ProviderListResponse(BaseModel):
    items: list[ProviderItem]


class ProviderUpdateRequest(BaseModel):
    api_key: str = Field(default="")


class ProviderUpdateResponse(BaseModel):
    item: ProviderItem


class CustomProviderCreateRequest(BaseModel):
    name: str
    base_url: str
    api_key: str = Field(default="")


class CustomProviderCreateResponse(BaseModel):
    item: ProviderItem

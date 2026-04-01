from fastapi import APIRouter


router = APIRouter()


@router.get("")
def list_providers() -> dict[str, list[object]]:
    return {"items": []}

from fastapi import APIRouter


router = APIRouter()


@router.get("")
def list_sessions() -> dict[str, list[object]]:
    return {"items": []}

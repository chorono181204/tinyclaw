from fastapi import APIRouter


router = APIRouter()


@router.get("")
def list_files() -> dict[str, list[object]]:
    return {"items": []}

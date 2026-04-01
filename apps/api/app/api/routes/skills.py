from fastapi import APIRouter


router = APIRouter()


@router.get("")
def list_skills() -> dict[str, list[object]]:
    return {"items": []}

from fastapi import APIRouter


router = APIRouter()


@router.get("")
def list_agents() -> dict[str, list[object]]:
    return {"items": []}

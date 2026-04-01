from fastapi import APIRouter


router = APIRouter()


@router.get("")
def get_settings_overview() -> dict[str, str]:
    return {"status": "not_implemented"}

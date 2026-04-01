from dataclasses import dataclass
from datetime import datetime


@dataclass(slots=True)
class SessionRecord:
    id: str
    title: str
    created_at: datetime

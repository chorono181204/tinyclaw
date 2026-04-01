from dataclasses import dataclass
from datetime import datetime


@dataclass(slots=True)
class TaskRecord:
    id: str
    title: str
    created_at: datetime
    status: str

from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class EventModel(BaseModel):
    name: str
    description: str
    date: datetime
    location: Optional[str] = None
    available_tickets: int
    category: Optional[str] = "General"  
    status: Optional[str] = "upcoming"   

    class Config:
        schema_extra = {
            "example": {
                "name": "Music Concert",
                "description": "An amazing concert experience",
                "date": "2024-11-11T20:00:00Z",
                "location": "City Arena",
                "available_tickets": 1500,
                "category": "Music",
                "status": "upcoming",
            }
        }

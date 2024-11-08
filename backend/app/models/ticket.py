from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class TicketModel(BaseModel):
    event_id: str
    ticket_type: str = Field(..., pattern="^(VIP|Regular)$") 
    price: float
    status: str = "available"
    user_id: Optional[str] = None
    purchase_date: Optional[datetime] = None  

    class Config:
        schema_extra = {
            "example": {
                "event_id": "event_id_here",
                "ticket_type": "VIP",
                "price": 50.0,
                "status": "available",
                "user_id": "user_id_here",
                "purchase_date": "2024-10-30T15:30:00Z",
            }
        }

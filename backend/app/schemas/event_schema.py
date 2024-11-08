from typing import List
from app.models.event import EventModel

def event_serializer(event) -> dict:
    return {
        "id": str(event["_id"]),
        "name": event["name"],
        "description": event["description"],
        "date": event["date"],
        "location": event["location"],
        "available_tickets": event["available_tickets"],
        "category": event["category"],
        "status": event ["status"]
    }

def events_serializer(events) -> list:
    return [event_serializer(event) for event in events]

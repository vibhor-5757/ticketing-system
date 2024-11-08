from fastapi import APIRouter, HTTPException
from app.controllers.event_controller import fetch_all_events, add_event, update_event, delete_event
from app.models.event import EventModel

router = APIRouter()

@router.get("/")
async def get_events():
    return await fetch_all_events()

@router.post("/")
async def create_event(event: EventModel):
    return await add_event(event.dict())

@router.put("/{id}")
async def update_event_data(id: str, event: EventModel):
    updated_event = await update_event(id, event.dict())
    if updated_event:
        return updated_event
    raise HTTPException(status_code=404, detail="Event not found")

@router.delete("/{id}")
async def delete_event_data(id: str):
    if await delete_event(id):
        return {"status": "Event deleted"}
    raise HTTPException(status_code=404, detail="Event not found")

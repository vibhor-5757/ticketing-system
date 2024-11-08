from app.config.db import ticket_collection, event_collection
from bson import ObjectId
from datetime import datetime
from fastapi import APIRouter

def convert_objectid_to_str(data):
    for item in data:
        if '_id' in item and isinstance(item['_id'], ObjectId):
            item['_id'] = str(item['_id'])
        if 'event_id' in item and isinstance(item['event_id'], ObjectId):
            item['event_id'] = str(item['event_id'])
        if 'user_id' in item and isinstance(item['user_id'], ObjectId):
            item['user_id'] = str(item['user_id'])
    return data

async def fetch_user_event_ids(user_id):
    tickets = await ticket_collection.find({"user_id": str(user_id)}).to_list(1000)
    event_ids = [ticket['event_id'] for ticket in tickets]
    return convert_objectid_to_str(event_ids)  

async def fetch_purchase_history(user_id):
    event_ids = await fetch_user_event_ids(user_id)
    if not event_ids:
        return []  
    events = await event_collection.find({"_id": {"$in": [ObjectId(eid) for eid in event_ids]}}).to_list(1000)
    return convert_objectid_to_str(events) 

async def fetch_upcoming_events(user_id):
    event_ids = await fetch_user_event_ids(user_id)
    if not event_ids:
        return []  
    current_date = datetime.utcnow()
    upcoming_events = await event_collection.find({
        "_id": {"$in": [ObjectId(eid) for eid in event_ids]},
        "date": {"$gte": current_date}
    }).to_list(1000)
    return convert_objectid_to_str(upcoming_events)  

router = APIRouter()

@router.get("/api/users/{user_id}/purchased-events")
async def get_user_event_ids(user_id: str):
    event_ids = await fetch_user_event_ids(user_id)
    return event_ids

@router.get("/api/users/{user_id}/purchased-history")
async def get_purchase_history(user_id: str):
    events = await fetch_purchase_history(user_id)
    return events

@router.get("/api/users/{user_id}/upcoming-events")
async def get_upcoming_events(user_id: str):
    upcoming_events = await fetch_upcoming_events(user_id)
    return upcoming_events

from app.config.db import event_collection
from app.schemas.event_schema import event_serializer, events_serializer
from bson import ObjectId

async def fetch_all_events():
    events = await event_collection.find().to_list(1000)
    return events_serializer(events)

async def add_event(event_data):
    event = await event_collection.insert_one(event_data)
    new_event = await event_collection.find_one({"_id": event.inserted_id})
    return event_serializer(new_event)

async def update_event(id, data):
    await event_collection.update_one({"_id": ObjectId(id)}, {"$set": data})
    event = await event_collection.find_one({"_id": ObjectId(id)})
    return event_serializer(event)

async def delete_event(id):
    await event_collection.delete_one({"_id": ObjectId(id)})
    return True

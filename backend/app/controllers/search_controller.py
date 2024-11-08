from fastapi.responses import JSONResponse
from app.config.db import event_collection  
from app.schemas.event_schema import event_serializer  
from bson import ObjectId  
from datetime import datetime

def convert_objectid_and_datetime_to_str(data):
    for item in data:
        for key, value in item.items():
            if isinstance(value, ObjectId):
                item[key] = str(value)
            elif isinstance(value, datetime):
                item[key] = value.isoformat()  
    return data

async def search_events(query: str):
    search_pipeline = [
        {
            "$match": {
                "$or": [
                    {"name": {"$regex": query, "$options": "i"}},
                    {"description": {"$regex": query, "$options": "i"}}
                ]
            }
        },
        {"$sort": {"date": 1}}
    ]
    events = await event_collection.aggregate(search_pipeline).to_list(100)
    events = convert_objectid_and_datetime_to_str(events)
    serialized_events = [event_serializer(event) for event in events]
    return serialized_events

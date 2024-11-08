from app.config.db import ticket_collection, event_collection
from bson import ObjectId
from datetime import datetime

def convert_objectid_to_str(data):
    for item in data:
        if '_id' in item and isinstance(item['_id'], ObjectId):
            item['_id'] = str(item['_id'])
        if 'event_id' in item and isinstance(item['event_id'], ObjectId):
            item['event_id'] = str(item['event_id'])
    return data

async def aggregate_ticket_sales(user_filter=None):
    pipeline = []
    if user_filter:
        pipeline.append({"$match": user_filter})

    pipeline.extend([
        {"$addFields": {"event_id": {"$toObjectId": "$event_id"}}},  # Ensure event_id is an ObjectId
        {"$group": {"_id": "$event_id", "totalTicketsSold": {"$sum": 1}}},
        {"$lookup": {"from": "events", "localField": "_id", "foreignField": "_id", "as": "eventDetails"}},
        {"$unwind": "$eventDetails"},
        {"$project": {"eventName": "$eventDetails.name", "totalTicketsSold": 1}},
        {"$sort": {"totalTicketsSold": -1}}
    ])
    result = await ticket_collection.aggregate(pipeline).to_list(1000)
    return convert_objectid_to_str(result)

async def aggregate_monthly_ticket_sales(user_filter=None):
    pipeline = []
    if user_filter:
        pipeline.append({"$match": user_filter})
        
    pipeline.extend([
        {"$match": {"purchase_date": {"$exists": True, "$ne": None}}},  # Only include documents with a purchase_date
        {"$addFields": {"yearMonth": {"$dateToString": {"format": "%Y-%m", "date": "$purchase_date"}}}},
        {"$group": {"_id": "$yearMonth", "totalTicketsSold": {"$sum": 1}}},
        {"$sort": {"_id": 1}}
    ])
    result = await ticket_collection.aggregate(pipeline).to_list(1000)
    return convert_objectid_to_str(result)

async def aggregate_popular_event_categories(user_filter=None):
    pipeline = []
    if user_filter:
        pipeline.append({"$match": user_filter})
        
    pipeline.extend([
        {"$addFields": {"event_id": {"$toObjectId": "$event_id"}}},  # Convert event_id to ObjectId for lookup
        {"$lookup": {"from": "events", "localField": "event_id", "foreignField": "_id", "as": "eventDetails"}},
        {"$unwind": "$eventDetails"},
        {"$group": {"_id": "$eventDetails.category", "totalTicketsSold": {"$sum": 1}}},
        {"$sort": {"totalTicketsSold": -1}}
    ])
    result = await ticket_collection.aggregate(pipeline).to_list(1000)
    return convert_objectid_to_str(result)

async def aggregate_unique_attendees_per_event(user_filter=None):
    pipeline = []
    if user_filter:
        pipeline.append({"$match": user_filter})
        
    pipeline.extend([
        {"$addFields": {"event_id": {"$toObjectId": "$event_id"}, "user_id": "$user_id"}},
        {"$group": {"_id": {"event_id": "$event_id", "user_id": "$user_id"}}},
        {"$group": {"_id": "$_id.event_id", "uniqueAttendees": {"$sum": 1}}},
        {"$lookup": {"from": "events", "localField": "_id", "foreignField": "_id", "as": "eventDetails"}},
        {"$unwind": "$eventDetails"},
        {"$project": {"eventName": "$eventDetails.name", "uniqueAttendees": 1}},
        {"$sort": {"uniqueAttendees": -1}}
    ])
    result = await ticket_collection.aggregate(pipeline).to_list(1000)
    return convert_objectid_to_str(result)

async def aggregate_sales_by_event_status(user_filter=None):
    pipeline = []
    if user_filter:
        pipeline.append({"$match": user_filter})

    pipeline.extend([
        {"$addFields": {"event_id": {"$toObjectId": "$event_id"}}},
        {"$lookup": {"from": "events", "localField": "event_id", "foreignField": "_id", "as": "eventDetails"}},
        {"$unwind": "$eventDetails"},
        {"$group": {"_id": "$eventDetails.status", "totalTicketsSold": {"$sum": 1}}}
    ])
    result = await ticket_collection.aggregate(pipeline).to_list(1000)
    return convert_objectid_to_str(result)

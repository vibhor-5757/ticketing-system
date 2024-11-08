from app.config.db import ticket_collection
from fastapi import HTTPException

from app.config.db import ticket_collection, event_collection
from bson import ObjectId
from fastapi import APIRouter
from datetime import datetime
from fastapi.responses import JSONResponse

async def aggregate_ticket_sales():
    pipeline = [
        {"$group": {"_id": "$event_id", "total_sales": {"$sum": "$price"}}},
        {"$sort": {"total_sales": -1}}
    ]
    sales_data = await ticket_collection.aggregate(pipeline).to_list(1000)
    return sales_data

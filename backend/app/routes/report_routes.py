from fastapi import APIRouter
from fastapi.responses import JSONResponse
from app.controllers.reports_controller import (
    aggregate_ticket_sales,
    aggregate_monthly_ticket_sales,
    aggregate_popular_event_categories,
    aggregate_unique_attendees_per_event,
    aggregate_sales_by_event_status,
)
from bson import ObjectId

def convert_objectid_to_str(data):
    for item in data:
        if '_id' in item and isinstance(item['_id'], ObjectId):
            item['_id'] = str(item['_id'])
        if 'event_id' in item and isinstance(item['event_id'], ObjectId):
            item['event_id'] = str(item['event_id'])
    return data

router = APIRouter()

@router.get("/api/reports/ticket-sales/{report_type}")
async def get_ticket_sales_report(report_type: str):
    if report_type == "total_sales":
        data = await aggregate_ticket_sales()
        data = convert_objectid_to_str(data)
        return JSONResponse(content={"data": data})

    elif report_type == "monthly_sales":
        data = await aggregate_monthly_ticket_sales()
        data = convert_objectid_to_str(data)
        return JSONResponse(content={"data": data})
    elif report_type == "popular_categories":
        data = await aggregate_popular_event_categories()
        data = convert_objectid_to_str(data)
        return JSONResponse(content={"data": data})
    elif report_type == "unique_attendees":
        data = await aggregate_unique_attendees_per_event()
        data = convert_objectid_to_str(data)
        return JSONResponse(content={"data": data})
    elif report_type == "sales_by_status":
        data = await aggregate_sales_by_event_status()
        data = convert_objectid_to_str(data)
        return JSONResponse(content={"data": data})
    else:
        return JSONResponse(content={"error": "Invalid report type"}, status_code=400)
    
    return JSONResponse(content={"data": data})


@router.get("/api/user-reports/{user_id}/ticket-sales/{report_type}")
async def get_user_ticket_sales_report(user_id: str, report_type: str):
    user_filter = {"user_id": (user_id)}
    data = []
    
    if report_type == "total_sales":
        data = await aggregate_ticket_sales(user_filter)
    elif report_type == "monthly_sales":
        data = await aggregate_monthly_ticket_sales(user_filter)
    elif report_type == "popular_categories":
        data = await aggregate_popular_event_categories(user_filter)
    elif report_type == "sales_by_status":
        data = await aggregate_sales_by_event_status(user_filter)
    else:
        return JSONResponse(content={"error": "Invalid report type"}, status_code=400)
    
    return JSONResponse(content={"data": convert_objectid_to_str(data)})

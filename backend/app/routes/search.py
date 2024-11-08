# src/routes/search_route.py
from fastapi import APIRouter, Query
from fastapi.responses import JSONResponse
from app.controllers.search_controller import search_events  # Import the search function

router = APIRouter()

@router.get("/api/events/search")
async def search_events_route(query: str = Query(..., description="Search query for events by name or description")):
    return await search_events(query)

from fastapi import APIRouter, HTTPException
from app.controllers.ticket_controller import fetch_all_tickets, add_ticket, update_ticket, delete_ticket
from app.models.ticket import TicketModel

router = APIRouter()

@router.get("/")
async def get_tickets():
    return await fetch_all_tickets()

@router.post("/")
async def create_ticket(ticket: TicketModel):
    return await add_ticket(ticket.dict())

@router.put("/{id}")
async def update_ticket_data(id: str, ticket: TicketModel):
    updated_ticket = await update_ticket(id, ticket.dict())
    if updated_ticket:
        return updated_ticket
    raise HTTPException(status_code=404, detail="Ticket not found")

@router.delete("/{id}")
async def delete_ticket_data(id: str):
    if await delete_ticket(id):
        return {"status": "Ticket deleted"}
    raise HTTPException(status_code=404, detail="Ticket not found")

@router.put("/{event_id}/assign")
async def assign_ticket(event_id: str, user_id: str, purchase_date: str):
    ticket = await ticket_collection.find_one({"event_id": event_id, "status": "available"})
    if not ticket:
        raise HTTPException(status_code=404, detail="No available tickets for this event")

    updated_ticket = await update_ticket(
        str(ticket["_id"]),
        {"user_id": user_id, "purchase_date": purchase_date, "status": "sold"}
    )
    return updated_ticket


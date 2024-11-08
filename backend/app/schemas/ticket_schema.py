from app.models.ticket import TicketModel

def ticket_serializer(ticket) -> dict:
    return {
        "id": str(ticket["_id"]),
        "event_id": str(ticket["event_id"]),
        "user_id": str(ticket["user_id"]),
        "ticket_type": ticket["ticket_type"],  
        "price": ticket["price"],
        "purchase_date": ticket["purchase_date"],
        "status": ticket["status"],
    }

def tickets_serializer(tickets) -> list:
    return [ticket_serializer(ticket) for ticket in tickets]

from app.config.db import ticket_collection
from app.schemas.ticket_schema import ticket_serializer, tickets_serializer
from bson import ObjectId

async def fetch_all_tickets():
    tickets = await ticket_collection.find().to_list(1000)
    return tickets_serializer(tickets)

async def add_ticket(ticket_data):
    ticket = await ticket_collection.insert_one(ticket_data)
    new_ticket = await ticket_collection.find_one({"_id": ticket.inserted_id})
    return ticket_serializer(new_ticket)

async def update_ticket(id, data):
    await ticket_collection.update_one({"_id": ObjectId(id)}, {"$set": data})
    ticket = await ticket_collection.find_one({"_id": ObjectId(id)})
    return ticket_serializer(ticket)

async def delete_ticket(id):
    await ticket_collection.delete_one({"_id": ObjectId(id)})
    return True

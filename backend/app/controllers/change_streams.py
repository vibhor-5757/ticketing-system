from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
import asyncio

app = FastAPI()

client = AsyncIOMotorClient("mongodb://localhost:27017")
db = client['your_database']
ticket_collection = db['tickets']

async def monitor_changes():
    async with ticket_collection.watch() as stream:
        async for change in stream:
            print("Change detected:", change)

def start_monitoring():
    loop = asyncio.get_event_loop()  
    loop.create_task(monitor_changes())  

@app.on_event("startup")
async def app_startup():
    start_monitoring()

@app.get("/")
async def root():
    return {"message": "Welcome to the ticket monitoring app!"}
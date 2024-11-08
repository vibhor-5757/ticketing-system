import os
import asyncio  
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException
from app.models.user import UserModel
from app.models.user import UserLoginModel
from app.auth.jwt import create_access_token, verify_password

load_dotenv()

MONGO_DETAILS = os.getenv("MONGO_URI")

client = AsyncIOMotorClient(MONGO_DETAILS)
database = client.ticketing_system

event_collection = database.get_collection("events")
ticket_collection = database.get_collection("tickets")
user_collection = database.get_collection("users")

event_collection.create_index("date")  
ticket_collection.create_index([("type", 1), ("event_id", 1)]) 
user_collection.create_index("email", unique=True)  

event_collection.create_index([("description", "text"), ("name", "text")])

router = APIRouter()

@router.post("/login")
async def login(user: UserLoginModel):
    db_user = await user_collection.find_one({"email": user.email})
    if db_user and verify_password(user.password, db_user["password"]):
        token = create_access_token(data={"sub": str(db_user["_id"])})
        return {"access_token": token, "token_type": "bearer"}
    raise HTTPException(status_code=401, detail="Incorrect email or password")






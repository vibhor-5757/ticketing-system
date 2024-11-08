from app.config.db import user_collection
from app.schemas.user_schema import user_serializer, users_serializer
from bson import ObjectId
from app.auth.jwt import get_password_hash  

async def fetch_all_users():
    users = await user_collection.find().to_list(1000)
    return users_serializer(users)

async def fetch_user(id: str):
    user = await user_collection.find_one({"_id": ObjectId(id)})
    return user_serializer(user)
    

async def add_user(user_data):
    user_data["password"] = get_password_hash(user_data["password"])  
    
    user = await user_collection.insert_one(user_data)
    new_user = await user_collection.find_one({"_id": user.inserted_id})
    return user_serializer(new_user)

async def update_user(id, data):
    if "password" in data:
        data["password"] = get_password_hash(data["password"])  
    
    await user_collection.update_one({"_id": ObjectId(id)}, {"$set": data})
    user = await user_collection.find_one({"_id": ObjectId(id)})
    return user_serializer(user)

async def delete_user(id):
    await user_collection.delete_one({"_id": ObjectId(id)})
    return True

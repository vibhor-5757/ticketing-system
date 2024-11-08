from fastapi import APIRouter, HTTPException, status
from app.config.db import user_collection
from app.schemas.user_schema import user_serializer
from app.auth.jwt import create_access_token, get_password_hash
from app.models.user import UserModel
from bson import ObjectId

router = APIRouter()

@router.post("/signup")
async def signup(user: UserModel):
    # Check if the email already exists
    existing_user = await user_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists"
        )
    
    # Hash the password
    user_data = user.dict()
    user_data["password"] = get_password_hash(user_data["password"])
    
    # Insert user into database
    new_user = await user_collection.insert_one(user_data)
    saved_user = await user_collection.find_one({"_id": new_user.inserted_id})
    
    # Create JWT token
    token = create_access_token(data={"sub": str(saved_user["_id"])})
    
    return {"access_token": token, "token_type": "bearer"}

from fastapi import APIRouter, HTTPException
from app.controllers.user_controller import fetch_all_users, add_user, update_user, delete_user, fetch_user
from app.models.user import UserModel

router = APIRouter()

@router.get("/")
async def get_users():
    return await fetch_all_users()

@router.get("/{id}")
async def get_users(id:str):
    return await fetch_user(id)

@router.post("/")
async def create_user(user: UserModel):
    return await add_user(user.dict())

@router.put("/{id}")
async def update_user_data(id: str, user: UserModel):
    updated_user = await update_user(id, user.dict())
    if updated_user:
        return updated_user
    raise HTTPException(status_code=404, detail="User not found")

@router.delete("/{id}")
async def delete_user_data(id: str):
    if await delete_user(id):
        return {"status": "User deleted"}
    raise HTTPException(status_code=404, detail="User not found")

from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class UserModel(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: Optional[str] = "customer"  

    class Config:
        schema_extra = {
            "example": {
                "name": "John Doe",
                "email": "john.doe@example.com",
                "password": "password123",
                "role": "customer",
            }
        }

class UserLoginModel(BaseModel):
    email: EmailStr
    password: str

    class Config:
        schema_extra = {
            "example": {
                "email": "john.doe@example.com",
                "password": "password123"
            }
        }
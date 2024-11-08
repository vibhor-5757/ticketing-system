from app.models.user import UserModel

def user_serializer(user):
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "role": user['role'],
    }

def users_serializer(users):
    return [user_serializer(user) for user in users]

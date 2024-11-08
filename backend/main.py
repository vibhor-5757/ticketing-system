from fastapi import FastAPI
from app.routes.event import router as EventRouter
from app.routes.ticket import router as TicketRouter
from app.routes.user import router as UserRouter
from app.routes.auth_routes import router as AuthRouter
from app.routes.user_event_ids import router as user_events
from app.routes.report_routes import router as report_router
from app.routes.search import router as search_router
from app.config.db import router as LoginRouter
from app.config.db import user_collection
from app.auth.jwt import pwd_context
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(EventRouter, prefix="/api/events")
app.include_router(TicketRouter, prefix="/api/tickets")
app.include_router(UserRouter, prefix="/api/users")
app.include_router(LoginRouter)
app.include_router(AuthRouter)  
app.include_router(user_events)  
app.include_router(report_router)  
app.include_router(search_router)  

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

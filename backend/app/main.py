from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.repository import router as repository_router


from app.config import *
from app.routers.health import router as health_router
from app.routers.chat import router as chat_router


app = FastAPI(title="AI Codebase Assistant API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(repository_router)
app.include_router(chat_router) 

@app.get("/")
def root():
    return {
        "message": "Welcome to AI Codebase Assistant API"
    }
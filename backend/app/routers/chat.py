from fastapi import APIRouter
from pydantic import BaseModel

from app.services.chat_service import ChatService

router = APIRouter(prefix="/chat", tags=["Chat"])


class ChatRequest(BaseModel):
    repository: str
    message: str


class ChatResponse(BaseModel):
    answer: str


@router.post("", response_model=ChatResponse)
def chat(request: ChatRequest):
    answer = ChatService.get_response(
        repository=request.repository,
        message=request.message,
    )

    return ChatResponse(answer=answer)
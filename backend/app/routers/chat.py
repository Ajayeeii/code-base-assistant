import logging

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.chat_service import ChatService

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)

logger = logging.getLogger(__name__)


class ChatRequest(BaseModel):
    repository: str
    message: str


class ChatResponse(BaseModel):
    answer: str


@router.post("", response_model=ChatResponse)
def chat(request: ChatRequest):
    try:
        answer = ChatService.get_response(
            repository=request.repository,
            message=request.message,
        )

        return ChatResponse(answer=answer)

    except FileNotFoundError:
        raise HTTPException(
            status_code=404,
            detail="Repository not found.",
        )

    except Exception:
        logger.exception("Chat request failed.")

        raise HTTPException(
            status_code=500,
            detail="Unable to generate an AI response.",
        )
from app.services.ollama_service import OllamaService


class ChatService:
    _ollama = OllamaService()

    @staticmethod
    def get_response(repository: str, message: str) -> str:
        prompt = f"""
You are an AI coding assistant.

The user is working with the following repository:

{repository}

User question:
{message}

Provide a clear, concise, and helpful answer.
"""

        return ChatService._ollama.generate(prompt)
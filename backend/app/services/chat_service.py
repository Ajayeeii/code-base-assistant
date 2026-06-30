from app.services.ollama_service import OllamaService
from app.services.repository_context_service import RepositoryContextService


class ChatService:
    _ollama = OllamaService()

    @staticmethod
    def get_response(repository: str, message: str) -> str:
        repository_context = RepositoryContextService.build_context(repository)
        prompt = f"""
You are an AI codebase assistant.

Answer questions using the provided repository context.

If the answer cannot be found in the repository, say so instead of making assumptions.

Repository:
{repository}

Repository Context:
{repository_context}

User Question:
{message}
"""

        return ChatService._ollama.generate(prompt)

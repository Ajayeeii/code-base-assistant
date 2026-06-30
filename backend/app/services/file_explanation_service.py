from pathlib import Path

from app.services.ollama_service import OllamaService


class FileExplanationService:
    _ollama = OllamaService()

    @staticmethod
    def explain_file(repository: str, path: str) -> str:
        repository_path = Path("app/workspace") / repository
        file_path = repository_path / path

        if not file_path.exists():
            raise FileNotFoundError("File not found.")

        content = file_path.read_text(encoding="utf-8")

        prompt = f"""
You are an AI codebase assistant.

Explain the following file.

Include:

1. Purpose
2. Important functions or classes
3. How it fits into the project
4. Possible improvements

File:
{path}

Code:
{content}
"""

        return FileExplanationService._ollama.generate(prompt)
from pathlib import Path

from app.services.ollama_service import OllamaService


class CodeImprovementService:
    _ollama = OllamaService()

    @staticmethod
    def improve_file(repository: str, path: str) -> str:
        repository_path = Path("app/workspace") / repository
        file_path = repository_path / path

        if not file_path.exists():
            raise FileNotFoundError("File not found.")

        content = file_path.read_text(encoding="utf-8")

        prompt = f"""
You are an experienced software engineer reviewing code.

Analyze ONLY the following file.

Suggest improvements for:

1. Readability
2. Maintainability
3. Performance
4. Best practices
5. Code organization

Do NOT rewrite the code.
Only provide explanations and suggestions.

File:
{path}

Code:
{content}
"""

        return CodeImprovementService._ollama.generate(prompt)
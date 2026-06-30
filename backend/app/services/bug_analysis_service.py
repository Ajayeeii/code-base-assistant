from pathlib import Path

from app.services.ollama_service import OllamaService


class BugAnalysisService:
    _ollama = OllamaService()

    @staticmethod
    def analyze_file(repository: str, path: str) -> str:
        repository_path = Path("app/workspace") / repository
        file_path = repository_path / path

        if not file_path.exists():
            raise FileNotFoundError("File not found.")

        content = file_path.read_text(encoding="utf-8")

        prompt = f"""
You are an experienced software engineer performing a code review.

Analyze ONLY the following file.

Report:

1. Bugs
2. Security issues
3. Performance issues
4. Code quality issues

If no issues are found, clearly say so.

File:
{path}

Code:
{content}
"""

        return BugAnalysisService._ollama.generate(prompt)
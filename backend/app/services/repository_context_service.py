from pathlib import Path


class RepositoryContextService:
    WORKSPACE = Path("app/workspace")

    IGNORE_DIRS = {
        ".git",
        "node_modules",
        "__pycache__",
        ".venv",
        "venv",
        "dist",
        "build",
    }

    IGNORE_EXTENSIONS = {
        ".png",
        ".jpg",
        ".jpeg",
        ".gif",
        ".ico",
        ".pdf",
        ".zip",
        ".exe",
        ".dll",
        ".so",
    }

    MAX_FILE_SIZE = 20_000

    @classmethod
    def build_context(cls, repository: str) -> str:
        repository_path = cls.WORKSPACE / repository

        if not repository_path.exists():
            return "Repository not found."

        context_parts: list[str] = []

        for path in repository_path.rglob("*"):
            if not path.is_file():
                continue

            if any(part in cls.IGNORE_DIRS for part in path.parts):
                continue

            if path.suffix.lower() in cls.IGNORE_EXTENSIONS:
                continue

            try:
                if path.stat().st_size > cls.MAX_FILE_SIZE:
                    continue

                content = path.read_text(encoding="utf-8")

            except Exception:
                continue

            relative_path = path.relative_to(repository_path)

            context_parts.append(
                f"""
File: {relative_path}

{content}
"""
            )

        return "\n".join(context_parts)
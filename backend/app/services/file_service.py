from pathlib import Path


class FileService:
    def __init__(self, repo_root: Path):
        self.repo_root = repo_root.resolve()

    def read_file(self, relative_path: str) -> str:
        file_path = (self.repo_root / relative_path).resolve()

        # Prevent reading files outside the repository
        if not str(file_path).startswith(str(self.repo_root)):
            raise ValueError("Invalid file path.")

        if not file_path.exists():
            raise FileNotFoundError("File not found.")

        if not file_path.is_file():
            raise ValueError("Not a file.")

        try:
            return file_path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            return "This file is not a UTF-8 text file."
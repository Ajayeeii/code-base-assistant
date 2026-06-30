class ChatService:
    @staticmethod
    def get_response(repository: str, message: str) -> str:
        return (
            "This is a fake backend response.\n\n"
            f"Repository: {repository}\n"
            f"Message: {message}"
        )
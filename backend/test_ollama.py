from app.services.ollama_service import OllamaService


def main():
    service = OllamaService()

    response = service.generate("Say hello.")

    print(response)


if __name__ == "__main__":
    main()
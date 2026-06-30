const API_BASE_URL = "http://localhost:8000";

export interface ChatRequest {
    repository: string;
    message: string;
}

export interface ChatResponse {
    answer: string;
}

export async function sendChatMessage(
    data: ChatRequest
) {
    const response = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result: ChatResponse = await response.json();

    if (!response.ok) {
        throw new Error("Failed to send message.");
    }

    return result;
}
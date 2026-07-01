import { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { sendChatMessage } from "../../services/chatService";



type Message = {
    role: "user" | "assistant";
    content: string;
};

type ChatPanelProps = {
    repositoryName: string;
};

export default function ChatPanel({
    repositoryName,
}: ChatPanelProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content:
                "Hello! Ask me anything about the repository.",
        },
    ]);

    const [isLoading, setIsLoading] = useState(false);

    const messagesContainerRef = useRef<HTMLDivElement | null>(null);

    const handleSend = async (message: string) => {
        setMessages((previous) => [
            ...previous,
            {
                role: "user",
                content: message,
            },
        ]);

        setIsLoading(true);

        try {
            const response = await sendChatMessage({
                repository: repositoryName,
                message,
            });

            setMessages((previous) => [
                ...previous,
                {
                    role: "assistant",
                    content: response.answer,
                },
            ]);
        } catch (error) {
            console.error(error);

            setMessages((previous) => [
                ...previous,
                {
                    role: "assistant",
                    content: "Failed to contact the backend.",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const container = messagesContainerRef.current;

        if (!container) return;

        container.scrollTo({
            top: container.scrollHeight,
            behavior: "smooth",
        });
    }, [messages, isLoading]);

    return (
        <section className="flex h-full flex-col">
            <div className="border-b border-slate-700 px-4 py-3">
                <h2 className="text-lg font-semibold">
                    AI Assistant
                </h2>
            </div>

            <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4"
            >
                {messages.map((message, index) => (
                    <ChatMessage
                        key={index}
                        role={message.role}
                        content={message.content}
                    />
                ))}
                {isLoading && (
                    <ChatMessage
                        role="assistant"
                        content="Thinking..."
                    />
                )}



            </div>

            <ChatInput onSend={handleSend} />
        </section>
    );
}
import { useState } from "react";

type ChatInputProps = {
  onSend: (message: string) => void;
};

export default function ChatInput({
  onSend,
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const trimmed = message.trim();

    if (!trimmed) return;

    onSend(trimmed);
    setMessage("");
  };

  return (
    <div className="flex gap-2 border-t border-slate-700 p-4">
      <input
        type="text"
        placeholder="Ask about the repository..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
        className="flex-1 rounded-md border border-slate-700 bg-slate-950 px-3 py-2 outline-none focus:border-blue-500"
      />

      <button
        onClick={handleSend}
        className="rounded-md bg-blue-600 px-4 py-2 hover:bg-blue-700"
      >
        Send
      </button>
    </div>
  );
}
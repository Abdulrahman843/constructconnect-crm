"use client";

import { useState } from "react";
import { IoChatbubblesSharp } from "react-icons/io5";

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    const newConversation = [...conversation, `You: ${userMessage}`];
    setConversation(newConversation);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversation: newConversation }),
      });

      const data = await res.json();
      if (data.reply) {
        setConversation((prev) => [...prev, `Bot: ${data.reply}`]);
      } else {
        setConversation((prev) => [...prev, "Bot: Sorry, I couldn't respond."]);
      }
    } catch (error) {
      console.error(error);
      setConversation((prev) => [...prev, "Bot: Error contacting server."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 z-50"
        >
          <IoChatbubblesSharp size={24} />
        </button>
      )}

      {/* Chatbot Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-end sm:items-center justify-center z-50">
          <div className="bg-white w-full sm:w-96 h-[90%] sm:h-[500px] rounded-t-lg sm:rounded-lg flex flex-col overflow-hidden shadow-lg">

            {/* Header */}
            <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
              <h2 className="text-lg font-bold">How can I help you?</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 text-2xl font-bold"
              >
                &times;
              </button>
            </div>

            {/* Chat body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-2 text-sm">
              {conversation.map((line, idx) => (
                <p
                  key={idx}
                  className={line.startsWith("Bot") ? "text-blue-700" : "text-gray-800"}
                >
                  {line}
                </p>
              ))}
              {loading && <p className="text-blue-500">Bot is typing...</p>}
            </div>

            {/* Input */}
            <div className="p-4 border-t flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Type a message..."
                className="flex-1 border rounded-l-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md text-sm transition-all duration-300"
              >
                Send
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

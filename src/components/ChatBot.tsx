"use client";

import { useState } from "react";
import { IoChatbubblesSharp } from "react-icons/io5";

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState<string[]>([]);

  const handleSend = async () => {
    if (!message.trim()) return;
  
    const userMessage = message;
    setConversation((prev) => [...prev, `You: ${userMessage}`]);
    setMessage("");
  
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
  
      const data = await res.json();
      if (data.reply) {
        setConversation((prev) => [...prev, `Bot: ${data.reply}`]);
      } else {
        setConversation((prev) => [...prev, "Bot: Sorry, I couldn't respond."]);
      }
    } catch (error) {
      console.error(error);
      setConversation((prev) => [...prev, "Bot: Error contacting the server."]);
    }
  };
  
  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <IoChatbubblesSharp size={24} />
      </button>

      {/* Chatbot Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 bg-white w-80 h-96 shadow-lg rounded-lg flex flex-col overflow-hidden">
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h2 className="text-lg font-bold">How can I help you?</h2>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200 text-2xl">&times;</button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-2">
            {conversation.map((line, idx) => (
              <p key={idx} className={line.startsWith("Bot") ? "text-blue-700" : "text-gray-800"}>
                {line}
              </p>
            ))}
          </div>

          <div className="p-4 border-t flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border rounded-l-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

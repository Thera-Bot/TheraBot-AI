"use client";

import { useChat } from "ai/react";
import { useRef, useEffect, useState } from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [showWelcome, setShowWelcome] = useState(true);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0) {
      setShowWelcome(false);
    }
  }, [messages]);

  return (
    <div className="flex flex-col w-full max-w-2xl py-24 mx-auto stretch relative">
      {showWelcome && (
        <div className="absolute top-0 left-0 right-0 p-4 bg-green-100 text-green-800 rounded-lg shadow-md mb-4 z-10">
          <p className="text-center">
            Welcome to TheraBot, I am your AI powered Psychotherapist. This
            conversation is not stored, refreshing the page will delete the
            conversation.
          </p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto mb-4 px-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`mb-4 ${m.role === "user" ? "text-right" : "text-left"}`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                m.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-green-200 text-green-800"
              }`}
            >
              <Markdown
                className="whitespace-pre-wrap"
                rehypePlugins={[rehypeHighlight]}
              >
                {m.content}
              </Markdown>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {m.role === "user" ? "You" : "TheraBot"}
            </p>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 w-full max-w-2xl m-auto bg-white p-4 flex"
      >
        <input
          className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          value={input}
          placeholder="Type your message here..."
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="bg-green-500 text-white rounded-r-lg p-2 w-12 h-12 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}

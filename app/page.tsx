"use client";

import { useChat } from "ai/react";
import { useRef, useEffect } from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`mb-4 ${m.role === "user" ? "text-right" : "text-left"}`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                m.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
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
            <div ref={bottomRef} />
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 w-full m-auto bg-white p-4"
      >
        <input
          className="w-full max-w-md p-2 border border-gray-300 rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          placeholder="Type your message here..."
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="absolute bottom-0 ml-4 transform -translate-y-1/2 bg-blue-500 text-white rounded-full p-2"
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

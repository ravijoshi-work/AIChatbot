import { useState, useEffect, useRef } from "react";
import MessageCard from "./MessageCard";

interface ChatModel {
  id: string;
  name: string;
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: number;
}

const chatModels: ChatModel[] = [
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
  },
  {
    id: "gpt-3.5-turbo-16k",
    name: "GPT-3.5 Turbo (16K)",
  },
];

const mockResponses = [
  "I understand you're asking about that. Let me help you...",
  "That's an interesting question. Here's what I think...",
  "Based on my knowledge, I can explain that...",
  "Let me break this down for you...",
  "Here's a helpful response to your query...",
];

const modelGreetings: Record<string, string> = {
  "gpt-3.5-turbo": "Hello! I'm GPT-3.5 Turbo. How can I assist you today?",
  "gpt-3.5-turbo-16k": "Hi there! I'm GPT-3.5 Turbo with 16K context window. Ready to help with longer conversations!",
};

const MessageSection = () => {
  const [selectedModel, setSelectedModel] = useState(chatModels[0].id);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "greeting",
      text: modelGreetings[chatModels[0].id],
      sender: "bot",
      timestamp: Date.now(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const getRandomResponse = () => {
    const randomIndex = Math.floor(Math.random() * mockResponses.length);
    return mockResponses[randomIndex];
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getRandomResponse(),
        sender: "bot",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
    if (messages.length === 0 || (messages.length === 1 && messages[0].id === "greeting")) {
      setMessages([
        {
          id: "greeting",
          text: modelGreetings[modelId],
          sender: "bot",
          timestamp: Date.now(),
        },
      ]);
    }
  };

  return (
    <>
      <div className="recent-chats" ref={chatContainerRef}>
        {messages.map((msg) => (
          <MessageCard key={msg.id} message={msg} />
        ))}
      </div>
      <section className="chat-section">
        <div className="input-section">
          <select
            value={selectedModel}
            onChange={(e) => handleModelChange(e.target.value)}
          >
            {chatModels.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="input"
            placeholder={isLoading ? "Please wait..." : "Type your message..."}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && inputMessage.trim()) {
                handleSendMessage(inputMessage);
              }
            }}
            disabled={isLoading}
          />
          <button
            className="send-button"
            onClick={() => handleSendMessage(inputMessage)}
            disabled={isLoading || !inputMessage.trim()}
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>
      </section>
    </>
  );
};

export default MessageSection;

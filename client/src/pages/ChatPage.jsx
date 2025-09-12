import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAppContext } from "../context/AppContext";

const ChatPage = () => {
  // eslint-disable-next-line no-unused-vars
  const { user, isSeller } = useAppContext();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatUsers, setChatUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch users (seller only)
  useEffect(() => {
    const fetchChatUsers = async () => {
      if (!isSeller) return;
      try {
        const res = await axios.get("/api/chat/seller/users", { withCredentials: true });
        if (res.data.success) setChatUsers(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchChatUsers();
  }, [isSeller]);

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const url = isSeller
          ? `/api/chat/seller/messages?userId=${selectedUserId}`
          : "/api/chat/user/messages";

        const res = await axios.get(url, { withCredentials: true });
        if (res.data.success) setMessages(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (!isSeller || selectedUserId) fetchMessages();
  }, [isSeller, selectedUserId]);

  const sendMessage = async () => {
    if (!input.trim() || (isSeller && !selectedUserId)) return;

    try {
      const url = isSeller ? "/api/chat/seller/send" : "/api/chat/user/send";
      const body = { message: input, receiverId: isSeller ? selectedUserId : null };

      const res = await axios.post(url, body, { withCredentials: true });
      if (res.data.success) {
        setMessages((prev) => [...prev, res.data.data]);
        setInput("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b shadow-sm p-4 flex items-center justify-between">
        <h2 className="font-semibold text-lg">
          {isSeller
            ? selectedUserId
              ? `Chat with ${chatUsers.find((u) => u._id === selectedUserId)?.name || "User"}`
              : "Select a User"
            : "Chat Support"}
        </h2>
      </div>

      {/* Seller: user selection */}
      {isSeller && (
        <div className="flex gap-2 p-2 border-b overflow-x-auto bg-gray-50 no-scrollbar">
          {chatUsers.map((u) => (
            <button
              key={u._id}
              onClick={() => setSelectedUserId(u._id)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition ${
                selectedUserId === u._id
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {u.name}
            </button>
          ))}
        </div>
      )}

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
        {messages.map((msg) => {
          const isOwnMessage =
            (isSeller && msg.isSeller) || (!isSeller && !msg.isSeller);
          return (
            <div
              key={msg._id}
              className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-xs md:max-w-sm break-words shadow-sm ${
                  isOwnMessage
                    ? "bg-[var(--color-primary)] text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.message}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t bg-white flex items-center gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-[var(--color-primary)] text-white px-5 py-2 rounded-full hover:bg-[var(--color-primary-dull)] transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;


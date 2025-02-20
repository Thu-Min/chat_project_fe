import { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import {
  fetchChatMessage,
  fetchChatMessagesSuccess,
  fetchChatDetail,
} from "../store/slices/chatSlice";
import { RootState, AppDispatch } from "../store/store";
import { useDispatch, useSelector } from "react-redux";

const ChatRoom = () => {
  const dispatch = useDispatch<AppDispatch>();
  const accessToken = useSelector((state: RootState) => state.auth.user.access);
  const selectedChatId = useSelector(
    (state: RootState) => state.chat.selectedChatId
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const messages = useSelector((state: RootState) => state.chat.messages);
  const chatDetail = useSelector((state: RootState) => state.chat.chatDetails);

  const [input, setInput] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const ws = useRef<WebSocket | null>(null);

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    dispatch(fetchChatDetail(accessToken, selectedChatId));
  }, [dispatch, selectedChatId]);

  useEffect(() => {
    dispatch(fetchChatMessage(accessToken, selectedChatId));
  }, [dispatch, selectedChatId]);

  useEffect(() => {
    if (!selectedChatId) return;

    ws.current = new WebSocket(
      `ws://127.0.0.1:8000/ws/chat/${selectedChatId}/`
    );

    ws.current.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.current.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      dispatch(fetchChatMessagesSuccess([...messages, newMessage]));
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.current.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [selectedChatId, dispatch, messages]);

  const handleSend = () => {
    if (
      ws.current &&
      ws.current.readyState === WebSocket.OPEN &&
      input.trim()
    ) {
      const messageData = JSON.stringify({
        sender_id: user.user.id,
        message: input,
      });

      ws.current.send(messageData);
      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!selectedChatId) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-900">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
            {chatDetail.type === "private" &&
              chatDetail.members?.[0]?.username?.[0].toUpperCase()}
          </div>
          <span className="font-semibold text-white">
            {chatDetail.type === "private" ? (
              <span className="font-bold">
                {chatDetail.members?.[0]?.username}
              </span>
            ) : (
              <span>
                {chatDetail.members
                  ?.map((member: any) => member.username)
                  .join(", ")}
              </span>
            )}
          </span>
        </div>
        <div className="flex space-x-4 text-white">
          <span className="cursor-pointer hover:text-gray-300">📞</span>
          <span className="cursor-pointer hover:text-gray-300">📹</span>
          <span className="cursor-pointer hover:text-gray-300">ℹ️</span>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-2">
        <div className="flex flex-col space-y-2">
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Container */}
      <div className="p-4 border-t border-gray-700 bg-gray-900">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Aa"
            className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;

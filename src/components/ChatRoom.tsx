import { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import { fetchChatMessage } from "../store/slices/chatSlice";
// import { sendMessage } from "../store/slices/chatSlice";
import { RootState, AppDispatch } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchChatMessagesSuccess } from "../store/slices/chatSlice";

const ChatRoom = () => {
  const dispatch = useDispatch<AppDispatch>();
  const accessToken = useSelector((state: RootState) => state.auth.user.access);
  const selectedChatId = useSelector(
    (state: RootState) => state.chat.selectedChatId
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const messages = useSelector((state: RootState) => state.chat.messages);

  const [input, setInput] = useState<string>("");
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    dispatch(fetchChatMessage(accessToken, selectedChatId));
  }, [dispatch, selectedChatId]);

  useEffect(() => {
    if (!selectedChatId) <div>Select a chat</div>;

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
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const messageData = JSON.stringify({
        sender_id: user.user.id,
        message: input,
      });

      ws.current.send(messageData);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        {/* <ChatMessage /> */}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          className="flex-1 p-2 border border-gray-300 rounded-l-md"
        />
        <button
          onClick={handleSend}
          className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;

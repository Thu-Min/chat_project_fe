import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface ChatMessageProps {
  message: {
    id: number;
    content: string;
    sender: {
      id: number;
      username: string;
    };
  };
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const userId = useSelector((state: RootState) => state.auth.user.user.id);
  const isCurrentUser = message.sender.id === userId;

  return (
    <div className="flex flex-col space-y-4 p-4">
      <div
        className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
      >
        <div
          className={`
            max-w-[70%] rounded-lg p-3
            ${
              isCurrentUser
                ? "bg-blue-500 text-white rounded-br-none"
                : "bg-gray-200 text-gray-800 rounded-bl-none"
            }
          `}
        >
          <p>{message.content}</p>
          <span
            className={`text-xs mt-1 block ${
              isCurrentUser ? "text-blue-100" : "text-gray-500"
            }`}
          >
            {message.sender.username}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;

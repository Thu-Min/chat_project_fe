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
    <div className="space-y-1 p-2">
      <div
        className={`flex items-start ${
          isCurrentUser ? "justify-end" : "justify-start"
        }`}
      >
        {!isCurrentUser && (
          <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center text-white text-sm mr-2">
            {message.sender.username[0].toUpperCase()}
          </div>
        )}

        <div className="flex flex-col">
          <div
            className={`
              px-4 py-2 rounded-2xl
              ${
                isCurrentUser
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-white"
              }
            `}
          >
            <p className="text-sm">{message.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;

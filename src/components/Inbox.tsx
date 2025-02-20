import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { fetchChatList, setSelectedChat } from "../store/slices/chatSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Inbox = () => {
  const dispatch = useDispatch<AppDispatch>();
  const chatList = useSelector((state: any) => state.chat.chatList);
  const accessToken = useSelector((state: RootState) => state.auth.user.access);

  useEffect(() => {
    dispatch(fetchChatList(accessToken));
  }, [dispatch, accessToken]);

  const handleChatSelect = (chatId: number) => {
    dispatch(setSelectedChat(chatId));
  };

  return (
    <div className="space-y-4">
      {chatList.map((chat: any) => (
        <div
          key={chat.id}
          onClick={() => handleChatSelect(chat.id)}
          className="flex items-center space-x-3 cursor-pointer hover:bg-gray-800 p-2 rounded"
        >
          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
            {chat.type === "private" &&
              chat.members[0].username[0].toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="flex justify-between">
              {chat.type === "private" ? (
                <div>
                  <span className="font-bold">{chat.members[0].username}</span>
                </div>
              ) : (
                <div>
                  <span>
                    {chat.members
                      .map((member: any) => member.username)
                      .join(", ")}
                  </span>
                </div>
              )}
              <span className="text-gray-400 text-sm">
                {chat.last_message.sent_time}
              </span>
            </div>
            <p className="text-gray-400 text-sm truncate">
              {chat.last_message.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Inbox;

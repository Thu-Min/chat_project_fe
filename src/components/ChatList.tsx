import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { fetchChatList, setSelectedChat } from "../store/slices/chatSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const ChatList = () => {
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
    <div className="bg-gray-900 text-white p-4 max-w-md overflow-y-auto h-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Chats</h1>
        <div className="flex gap-4">
          <span className="cursor-pointer">•••</span>
          <span className="cursor-pointer">↗</span>
        </div>
      </div>

      <div className="bg-gray-800 rounded-full mb-4">
        <div className="flex items-center px-4 py-2">
          <span className="text-gray-400 mr-2">🔍</span>
          <input
            type="text"
            placeholder="Search Messenger"
            className="bg-transparent w-full outline-none text-gray-300"
          />
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button className="bg-gray-700 px-4 py-1 rounded-full text-sm">
          Inbox
        </button>
        <button className="text-gray-400 px-4 py-1 rounded-full text-sm">
          Communities
        </button>
      </div>

      <div className="space-y-4">
        {chatList.map((chat: any) => (
          <div
            key={chat.id}
            onClick={() => handleChatSelect(chat.id)}
            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-800 p-2 rounded"
          >
            <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center"></div>
            <div className="flex-1">
              <div className="flex justify-between">
                {chat.type === "private" ? (
                  <div>
                    <span className="font-bold">
                      {chat.members[0].username}
                    </span>
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
    </div>
  );
};

export default ChatList;

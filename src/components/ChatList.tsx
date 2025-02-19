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
    <div>
      <ul>
        {chatList.map((chat: any) => (
          <li
            key={chat.id}
            className="p-4 border-b"
            onClick={() => handleChatSelect(chat.id)}
          >
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;

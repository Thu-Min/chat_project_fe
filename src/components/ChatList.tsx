import { useEffect, useState } from "react";
import Inbox from "./Inbox";
import Community from "./Community";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchAllUserList } from "../store/slices/userSlice";
import { createChat } from "../store/slices/chatSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";

type TabType = "inbox" | "communities";

const ChatList = () => {
  const [activeTab, setActiveTab] = useState<TabType>("inbox");
  const [showModal, setShowModal] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.user.userList);

  useEffect(() => {
    dispatch(fetchAllUserList());
  }, [dispatch]);

  const handleCreateChat = async (userId: any) => {
    try {
      await dispatch(createChat("private", [{ id: userId }]));
      setShowModal(false);
    } catch (error) {
      console.error("Failed to create new chat", error);
    }
  };

  return (
    <div className="bg-gray-900 text-white p-4 max-w-md overflow-y-auto h-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Chats</h1>
        <div className="flex gap-4">
          <span className="cursor-pointer" onClick={() => setShowModal(true)}>
            ↗
          </span>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-sm w-full shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Start a new chat</h2>
            <ul className="max-h-60 overflow-y-auto space-y-2">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 cursor-pointer transition-colors duration-200"
                  onClick={() => handleCreateChat(user.id)}
                >
                  {user.username}
                </li>
              ))}
            </ul>
            <button
              className="mt-4 bg-red-600 px-4 py-2 rounded-full text-white cursor-pointer hover:bg-red-500 transition-colors duration-200"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab("inbox")}
          className={`px-4 py-1 rounded-full text-sm transition-colors duration-200 ${
            activeTab === "inbox"
              ? "bg-gray-700 text-white"
              : "text-gray-400 hover:bg-gray-800"
          }`}
        >
          Inbox
        </button>
        <button
          onClick={() => setActiveTab("communities")}
          className={`px-4 py-1 rounded-full text-sm transition-colors duration-200 ${
            activeTab === "communities"
              ? "bg-gray-700 text-white"
              : "text-gray-400 hover:bg-gray-800"
          }`}
        >
          Communities
        </button>
      </div>

      {/* Render content based on active tab */}
      {activeTab === "inbox" ? <Inbox /> : <Community />}
    </div>
  );
};

export default ChatList;

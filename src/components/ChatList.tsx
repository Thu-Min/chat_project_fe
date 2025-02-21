import { useEffect, useState } from "react";
import Inbox from "./Inbox";
import Communitiy from "./Community";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchAllUserList } from "../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";

type TabType = "inbox" | "communities";

const ChatList = () => {
  const [activeTab, setActiveTab] = useState<TabType>("inbox");
  const [showModal, setShowModal] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.user.userList);

  useEffect(() => {
    dispatch(fetchAllUserList);
  }, [dispatch]);

  return (
    <div className="bg-gray-900 text-white p-4 max-w-md overflow-y-auto h-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Chats</h1>
        <div className="flex gap-4">
          <span className="cursor-pointer">•••</span>
          <span className="cursor-pointer" onClick={() => setShowModal(true)}>
            ↗
          </span>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-4 rounded-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Start a new chat</h2>
            <ul className="max-h-60 overflow-y-auto">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="p-2 hover:bg-gray-700 cursor-pointer"
                  onClick={() => console.log(user.id)}
                >
                  {user.name}
                </li>
              ))}
            </ul>
            <button
              className="mt-4 bg-red-600 px-4 py-2 rounded-full text-white"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

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
      {activeTab === "inbox" ? <Inbox /> : <Communitiy />}
    </div>
  );
};

export default ChatList;

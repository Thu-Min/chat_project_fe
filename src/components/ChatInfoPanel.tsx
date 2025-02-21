import { useState } from "react";
import { addMember, deleteChat } from "../store/slices/chatSlice";
import { RootState, AppDispatch } from "../store/store";
import { useDispatch, useSelector } from "react-redux";

const ChatInfoPanel = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const selectedChatId = useSelector(
    (state: RootState) => state.chat.selectedChatId
  );

  const chatDetail = useSelector((state: RootState) => state.chat.chatDetails);
  const users = useSelector((state: RootState) => state.user.userList);

  const nonMembers = users.filter(
    (user) => !chatDetail.members.some((member: any) => member.id === user.id)
  );

  const handleDelete = () => {
    dispatch(deleteChat(selectedChatId));
  };

  const handleAddMember = (userId: number) => {
    dispatch(addMember(selectedChatId, userId));
    setShowModal(false);
  };

  return (
    <div className="border-l border-gray-700 bg-gray-900 h-full">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white">Chat Details</h2>
      </div>

      <div className="overflow-y-auto">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">
            Chat Settings
          </h3>
          <div className="space-y-2">
            <div
              onClick={() => setShowModal(true)}
              className="flex items-center text-white cursor-pointer hover:bg-gray-800 p-2 rounded"
            >
              <span className="mr-3">🧑</span>
              Add Member
            </div>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg max-w-sm w-full shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Add new member</h2>
              <ul className="max-h-60 overflow-y-auto space-y-2">
                {nonMembers.map((user) => (
                  <li
                    key={user.id}
                    className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 cursor-pointer transition-colors duration-200"
                    onClick={() => handleAddMember(user.id)}
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

        <div className="p-4">
          <div className="space-y-2">
            <button
              onClick={handleDelete}
              className="w-full text-red-500 hover:bg-gray-800 p-2 rounded text-left"
            >
              Delete Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInfoPanel;

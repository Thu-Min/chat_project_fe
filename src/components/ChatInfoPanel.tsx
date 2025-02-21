import { deleteChat } from "../store/slices/chatSlice";
import { RootState, AppDispatch } from "../store/store";
import { useDispatch, useSelector } from "react-redux";

const ChatInfoPanel = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedChatId = useSelector(
    (state: RootState) => state.chat.selectedChatId
  );

  const handleDelete = () => {
    dispatch(deleteChat(selectedChatId));
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
            <div className="flex items-center text-white cursor-pointer hover:bg-gray-800 p-2 rounded">
              <span className="mr-3">🧑</span>
              Add Member
            </div>
          </div>
        </div>

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

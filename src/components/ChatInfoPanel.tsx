const ChatInfoPanel = () => {
  return (
    <div className="border-l border-gray-700 bg-gray-900 h-full">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white">Chat Details</h2>
      </div>

      <div className="overflow-y-auto">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">
            Customize Chat
          </h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-white">Chat Theme</span>
            <span className="w-6 h-6 rounded-full bg-blue-600 cursor-pointer"></span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white">Emoji</span>
            <span className="cursor-pointer">👋</span>
          </div>
        </div>

        <div className="p-4 border-b border-gray-700">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">
            Media, Files & Links
          </h3>
          <div className="space-y-2">
            <div className="flex items-center text-white cursor-pointer hover:bg-gray-800 p-2 rounded">
              <span className="mr-3">🖼️</span>
              Media
            </div>
            <div className="flex items-center text-white cursor-pointer hover:bg-gray-800 p-2 rounded">
              <span className="mr-3">📁</span>
              Files
            </div>
            <div className="flex items-center text-white cursor-pointer hover:bg-gray-800 p-2 rounded">
              <span className="mr-3">🔗</span>
              Links
            </div>
          </div>
        </div>

        <div className="p-4 border-b border-gray-700">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">
            Privacy & Support
          </h3>
          <div className="space-y-2">
            <div className="flex items-center text-white cursor-pointer hover:bg-gray-800 p-2 rounded">
              <span className="mr-3">🔒</span>
              Privacy Settings
            </div>
            <div className="flex items-center text-white cursor-pointer hover:bg-gray-800 p-2 rounded">
              <span className="mr-3">⚠️</span>
              Report Issue
            </div>
            <div className="flex items-center text-white cursor-pointer hover:bg-gray-800 p-2 rounded">
              <span className="mr-3">❌</span>
              Block User
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="space-y-2">
            <button className="w-full text-red-500 hover:bg-gray-800 p-2 rounded text-left">
              Delete Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInfoPanel;

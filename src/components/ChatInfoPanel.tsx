const ChatInfoPanel = () => {
  return (
    <div className="border-l border-gray-700 bg-gray-900 h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white">Chat Details</h2>
      </div>

      {/* Main Content */}
      <div className="overflow-y-auto">
        {/* Customize Chat Section */}
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

        {/* Media, Files & Links */}
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

        {/* Privacy & Support */}
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

        {/* Shared Photos */}
        {/* <div className="p-4 border-b border-gray-700">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">
            Shared Photos
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="aspect-square bg-gray-800 rounded cursor-pointer"
              >
                <img
                  src={`/api/placeholder/80/80`}
                  alt="Shared photo"
                  className="w-full h-full object-cover rounded"
                />
              </div>
            ))}
          </div>
        </div> */}

        {/* Quick Actions */}
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

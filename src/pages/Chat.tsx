import ChatInfoPanel from "../components/ChatInfoPanel";
import ChatList from "../components/ChatList";
import ChatRoom from "../components/ChatRoom";

const Chat = () => {
  return (
    <div className="flex">
      <div className="w-1/4">
        <ChatList />
      </div>
      <div className="border w-2/4">
        <ChatRoom />
      </div>
      <div className="w-1/4">
        <ChatInfoPanel />
      </div>
    </div>
  );
};

export default Chat;

import ChatList from "../components/ChatList";
import ChatRoom from "../components/ChatRoom";
import UserList from "../components/UserList";

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
                <UserList />
            </div>
        </div>
    );
}

export default Chat;
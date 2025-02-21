import ChatInfoPanel from "../components/ChatInfoPanel";
import ChatList from "../components/ChatList";
import ChatRoom from "../components/ChatRoom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  });

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

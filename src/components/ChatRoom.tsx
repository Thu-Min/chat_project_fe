import { useState } from 'react';
import ChatMessage from './ChatMessage';
import { sendMessage } from '../store/slices/chatSlice';
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";

const ChatRoom = () => {
    const dispatch = useDispatch<AppDispatch>();
    const accessToken = useSelector((state: RootState) => state.auth.user.access);
    const selectedChatId = useSelector((state: RootState) => state.chat.selectedChatId);

    const [input, setInput] = useState<string>('');


    const handleSend = () => {
        dispatch(sendMessage(accessToken, selectedChatId, input));
    };

    return (
        <div className="flex flex-col h-full p-4">
            <div className="flex-1 overflow-y-auto mb-4">
            <ChatMessage />
            </div>
            <div className="flex">
            <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder="Type your message here..." 
                className="flex-1 p-2 border border-gray-300 rounded-l-md"
            />
            <button 
                onClick={handleSend} 
                className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
            >
                Send
            </button>
            </div>
        </div>
    );
}

export default ChatRoom;
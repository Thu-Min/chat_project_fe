import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { fetchChatMessage } from "../store/slices/chatSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const ChatMessage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const chatMessage = useSelector((state: any) => state.chat.messages);
    const accessToken = useSelector((state: RootState) => state.auth.user.access);
    const selectedChatId = useSelector((state: RootState) => state.chat.selectedChatId);
    const userId = useSelector((state: RootState) => state.auth.user.user.id)

    useEffect(() => {
        dispatch(fetchChatMessage(accessToken, selectedChatId));
    }, [dispatch, accessToken]);

    return (
        <div className="flex flex-col space-y-4 p-4">
            {chatMessage.map((message: any) => {
                const isCurrentUser = message.sender.id === userId;
                
                return (
                    <div 
                        key={message.id} 
                        className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                    >
                        <div 
                            className={`
                                max-w-[70%] rounded-lg p-3
                                ${isCurrentUser 
                                    ? 'bg-blue-500 text-white rounded-br-none' 
                                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                                }
                            `}
                        >
                            <p>{message.content}</p>
                            <span className={`text-xs mt-1 block ${isCurrentUser ? 'text-blue-100' : 'text-gray-500'}`}>
                                {message.sender.username}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ChatMessage;
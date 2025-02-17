import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface ChatState {
    chatList: any[];
    selectedChatId?: any; //TODO: Change this to number
    loading?: boolean;
    error?: string;
}

const initialChatListState: ChatState = {
    chatList: [],
    selectedChatId: null,
    loading: false,
    error: '',
};

interface ChatMessageState {
    messages: any[];
    loading?: boolean;
    error?: string;
}

const initialMessageState: ChatMessageState = {
    messages: [],
    loading: false,
    error: '',
};

const chatSlice = createSlice({
    name: "chat",
    initialState: { ...initialChatListState, ...initialMessageState },
    reducers: {
        fetchChatListStart: (state) => {
            state.loading = true;
            state.error = '';
        },
        fetchChatListSuccess: (state, action: PayloadAction<any[]>) => {
            state.loading = false;
            state.chatList = action.payload;
        },
        fetchChatListFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        setSelectedChat: (state, action: PayloadAction<number>) => {
            state.selectedChatId = action.payload;
        },
        fetchChatMessagesStart: (state) => {
            state.loading = true;
            state.error = '';
        },
        fetchChatMessagesSuccess: (state, action: PayloadAction<any[]>) => {
            state.loading = false;
            state.messages = action.payload;
        },
        fetchChatMessagesFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})


export const fetchChatList = (accessToken: string) => async (dispatch: any) => {
    dispatch(fetchChatListStart());

    try {
        const response = await axios.get("http://127.0.0.1:8000/api/chat_rooms/", {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        });

        dispatch(fetchChatListSuccess(response.data));
    } catch (error: any) {
        dispatch(fetchChatListFailed(error.message));
    }
}

export const fetchChatMessage = (accessToken: string, chatId: number) => async (dispatch: any) => {
    dispatch(fetchChatMessagesStart());

    try {
        const response = await axios.get("http://127.0.0.1:8000/api/messages", {
            params: {
                chatroom_id: chatId
            },
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        });

        dispatch(fetchChatMessagesSuccess(response.data));
    } catch {
        dispatch(fetchChatMessagesFailed("Failed to fetch messages"));
    }
}

export const sendMessage = (accessToken: string, chatId: number, content: string) => async (dispatch: any, getState: any) => {
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/send_message/", {
            chatroom_id: chatId,
            content: content
        }, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        })

        if (response.data) {
            const currentMessages = getState().chat.messages;
            dispatch(fetchChatMessagesSuccess([...currentMessages, response.data]));
        }
    } catch (error: any) {
        console.log(error);
    }
}

export const { fetchChatListStart, fetchChatListSuccess, fetchChatListFailed, setSelectedChat, fetchChatMessagesStart, fetchChatMessagesSuccess, fetchChatMessagesFailed } = chatSlice.actions;
export default chatSlice.reducer;
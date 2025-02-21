import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/axios";

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
  error: "",
};

interface ChatDetailState {
  chatDetails: any;
  loading?: boolean;
  error?: string;
}

const initialChatDetailState: ChatDetailState = {
  chatDetails: {},
  loading: false,
  error: "",
};

interface ChatMessageState {
  messages: any[];
  loading?: boolean;
  error?: string;
}

const initialMessageState: ChatMessageState = {
  messages: [],
  loading: false,
  error: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    ...initialChatListState,
    ...initialMessageState,
    ...initialChatDetailState,
  },
  reducers: {
    fetchChatListStart: (state) => {
      state.loading = true;
      state.error = "";
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
    fetchChatDetailStart: (state) => {
      state.loading = true;
      state.error = "";
    },
    fetchChatDetailSuccess: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.chatDetails = action.payload;
    },
    fetchChatDetailFailed: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchChatMessagesStart: (state) => {
      state.loading = true;
      state.error = "";
    },
    fetchChatMessagesSuccess: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.messages = action.payload;
    },
    fetchChatMessagesFailed: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearState: (state) => {
      state.chatList = [];
      state.selectedChatId = null;
    },
  },
});

export const fetchChatList = () => async (dispatch: any) => {
  dispatch(fetchChatListStart());

  try {
    const response = await api.get("/chat_rooms/");

    dispatch(fetchChatListSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchChatListFailed(error.message));
  }
};

export const fetchChatDetail = (chatId: number) => async (dispatch: any) => {
  dispatch(fetchChatDetailStart());

  try {
    const response = await api.get("/chat_room/", {
      params: {
        chatroom_id: chatId,
      },
    });

    dispatch(fetchChatDetailSuccess(response.data));
  } catch {
    dispatch(fetchChatDetailFailed("Failed to fetch messages"));
  }
};

export const fetchChatMessage = (chatId: number) => async (dispatch: any) => {
  dispatch(fetchChatMessagesStart());

  try {
    const response = await api.get("/messages/", {
      params: {
        chatroom_id: chatId,
      },
    });

    dispatch(fetchChatMessagesSuccess(response.data));
  } catch {
    dispatch(fetchChatMessagesFailed("Failed to fetch messages"));
  }
};

export const createChat =
  (type: string, members: { id: number }[]) =>
  async (dispatch: any, getState: any) => {
    try {
      const response = await api.post("/create_chat_room/", {
        type: type,
        members: members,
      });

      if (response.data) {
        const currentChatList = getState().chat.chatList;
        dispatch(fetchChatListSuccess([...currentChatList, response.data]));
      }
    } catch (error: any) {
      console.log(error);
    }
  };

export const sendMessage =
  (chatId: number, content: string) => async (dispatch: any, getState: any) => {
    try {
      const response = await api.post(
        "http://127.0.0.1:8000/api/send_message/",
        {
          chatroom_id: chatId,
          content: content,
        }
      );

      if (response.data) {
        const currentMessages = getState().chat.messages;
        dispatch(fetchChatMessagesSuccess([...currentMessages, response.data]));
      }
    } catch (error: any) {
      console.log(error);
    }
  };

export const {
  fetchChatListStart,
  fetchChatListSuccess,
  fetchChatListFailed,
  setSelectedChat,
  fetchChatDetailStart,
  fetchChatDetailSuccess,
  fetchChatDetailFailed,
  fetchChatMessagesStart,
  fetchChatMessagesSuccess,
  fetchChatMessagesFailed,
} = chatSlice.actions;
export default chatSlice.reducer;

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
    setSelectedChat: (state, action: PayloadAction<number | null>) => {
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
    try {
      dispatch(fetchChatListFailed(error.message));
    } catch (innerError: any) {
      console.error("Error dispatching fetchChatListFailed:", innerError);
    }
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
  } catch (error: any) {
    console.log("Fetch chat detail error:", error);
    try {
      dispatch(
        fetchChatDetailFailed(error.message || "Failed to fetch chat details")
      );
    } catch (innerError: any) {
      console.error("Error dispatching fetchChatDetailFailed:", innerError);
    }
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
  } catch (error: any) {
    console.log("Fetch chat messages error:", error);
    try {
      dispatch(
        fetchChatMessagesFailed(error.message || "Failed to fetch messages")
      );
    } catch (innerError: any) {
      console.error("Error dispatching fetchChatMessagesFailed:", innerError);
    }
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
        console.log(response.data);
        dispatch(fetchChatListSuccess([...currentChatList, response.data]));
        dispatch(setSelectedChat(response.data.id));
      }
    } catch (error: any) {
      console.log(error);
    }
  };

export const sendMessage =
  (chatId: number, content: string) => async (dispatch: any, getState: any) => {
    try {
      const response = await api.post("/send_message/", {
        chatroom_id: chatId,
        content: content,
      });

      if (response.data) {
        const currentMessages = getState().chat.messages;
        dispatch(fetchChatMessagesSuccess([...currentMessages, response.data]));
      }
    } catch (error: any) {
      console.log(error);
    }
  };

export const deleteChat =
  (chatId: number) => async (dispatch: any, getState: any) => {
    try {
      await api.delete("/delete_chat_room/", {
        data: { chatroom_id: chatId },
      });

      const currentChatList = getState().chat.chatList;
      const updatedChatList = currentChatList.filter(
        (chat: any) => chat.id !== chatId
      );

      dispatch(fetchChatListSuccess(updatedChatList));
      dispatch(setSelectedChat(null));
    } catch (error: any) {
      console.log("Delete chat error:", error);
    }
  };

export const addMember =
  (chatId: number, userId: number) => async (dispatch: any) => {
    try {
      const response = await api.post("/add_member/", {
        chatroom_id: chatId,
        user_id: userId,
      });

      dispatch(fetchChatDetailSuccess(response.data));
    } catch (error: any) {
      console.log("Add new member error:", error);
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

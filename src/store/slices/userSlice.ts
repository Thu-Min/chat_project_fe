import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/axios";

interface UserListState {
  userList: any[];
  onlineUserList: any[];
  offlineUserList: any[];
  loading?: boolean;
  error?: string;
}

const initialState: UserListState = {
  userList: [],
  onlineUserList: [],
  offlineUserList: [],
  loading: false,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchOnlineUserListStart: (state) => {
      state.loading = true;
      state.error = "";
    },
    fetchOnlineUserListSuccess: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.onlineUserList = action.payload;
    },
    fetchOnlineUserListFailed: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchOfflineUserListStart: (state) => {
      state.loading = true;
      state.error = "";
    },
    fetchOfflineUserListSuccess: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.offlineUserList = action.payload;
    },
    fetchOfflineUserListFailed: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchAllUserListStart: (state) => {
      state.loading = true;
      state.error = "";
    },
    fetchAllUserListSuccess: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.userList = action.payload;
    },
    fetchAllUserListFailed: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearState: (state) => {
      state.userList = [];
      state.onlineUserList = [];
      state.offlineUserList = [];
    },
  },
});

export const fetchOnlineUserList = () => async (dispatch: any) => {
  dispatch(fetchOnlineUserListStart());

  try {
    const response = await api.get("/online_users/");
    dispatch(fetchOnlineUserListSuccess(response.data));
  } catch (error: any) {
    if (error.response) {
      dispatch(fetchOnlineUserListFailed(error.response.data.message));
    } else {
      dispatch(fetchOnlineUserListFailed(error.message));
    }
  }
};

export const fetchOfflineUserList = () => async (dispatch: any) => {
  dispatch(fetchOfflineUserListStart());

  try {
    const response = await api.get("/offline_users/");
    dispatch(fetchOfflineUserListSuccess(response.data));
  } catch (error: any) {
    if (error.response) {
      dispatch(fetchOfflineUserListFailed(error.response.data.message));
    } else {
      dispatch(fetchOfflineUserListFailed(error.message));
    }
  }
};

export const fetchAllUserList = () => async (dispatch: any) => {
  dispatch(fetchAllUserListStart());

  try {
    const response = await api.get("/users/");
    dispatch(fetchAllUserListSuccess(response.data));
  } catch (error: any) {
    if (error.response) {
      dispatch(fetchAllUserListFailed(error.response.data.message));
    } else {
      dispatch(fetchAllUserListFailed(error.message));
    }
  }
};

export const {
  fetchOnlineUserListStart,
  fetchOnlineUserListSuccess,
  fetchOnlineUserListFailed,
  fetchOfflineUserListStart,
  fetchOfflineUserListSuccess,
  fetchOfflineUserListFailed,
  fetchAllUserListStart,
  fetchAllUserListSuccess,
  fetchAllUserListFailed,
} = userSlice.actions;
export default userSlice.reducer;

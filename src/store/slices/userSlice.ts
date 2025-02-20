import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UserListState {
  onlineUserList: any[];
  offlineUserList: any[];
  loading?: boolean;
  error?: string;
}

const initialState: UserListState = {
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
  },
});

export const fetchOnlineUserList =
  (accessToken: string) => async (dispatch: any) => {
    dispatch(fetchOnlineUserListStart());

    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/online_users/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(fetchOnlineUserListSuccess(response.data));
    } catch (error: any) {
      dispatch(fetchOnlineUserListFailed(error.message));
    }
  };

export const fetchOfflineUserList =
  (accessToken: string) => async (dispatch: any) => {
    dispatch(fetchOfflineUserListStart());

    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/offline_users",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(fetchOfflineUserListSuccess(response.data));
    } catch (error: any) {
      dispatch(fetchOfflineUserListFailed(error.message));
    }
  };

export const {
  fetchOnlineUserListStart,
  fetchOnlineUserListSuccess,
  fetchOnlineUserListFailed,
  fetchOfflineUserListStart,
  fetchOfflineUserListSuccess,
  fetchOfflineUserListFailed,
} = userSlice.actions;
export default userSlice.reducer;

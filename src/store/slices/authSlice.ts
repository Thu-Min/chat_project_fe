import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authAPI } from "../../api/auth";
import { setAuthToken } from "../../api/axios";

interface AuthState {
  isAuthenticated: boolean;
  user?: any;
  loading?: boolean;
  error?: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: "",
  loading: false,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = "";
    },
    loginSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      setAuthToken(action.payload.accessToken);
    },
    loginFailed: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutStart: (state) => {
      state.loading = true;
      state.error = "";
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = "";
      setAuthToken(null);
    },
    logoutFailed: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.user.accessToken = action.payload;
      setAuthToken(action.payload);
    },
  },
});

export const login = (username: string) => async (dispatch: any) => {
  dispatch(loginStart());
  try {
    const response = await authAPI.login(username);
    dispatch(loginSuccess(response.data));
  } catch {
    dispatch(loginFailed("An error occurred"));
  }
};

export const logout =
  (refreshToken: string, accessToken: string) => async (dispatch: any) => {
    dispatch(logoutStart());
    try {
      await authAPI.logout(refreshToken, accessToken);
      dispatch(logoutSuccess());
    } catch {
      dispatch(logoutFailed("An error occurred"));
    }
  };

export const refreshToken = (refreshToken: string) => async (dispatch: any) => {
  try {
    console.log(refreshToken);
    const response = await authAPI.refreshToken(refreshToken);
    dispatch(updateAccessToken(response.data.access));
    return response.data;
  } catch (error) {
    dispatch(logoutSuccess());
    throw error;
  }
};

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  logoutStart,
  logoutSuccess,
  logoutFailed,
  updateAccessToken,
} = authSlice.actions;

export default authSlice.reducer;

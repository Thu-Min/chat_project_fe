import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// TODO: separate the interface (authState) and (user)
interface AuthState {
    isAuthenticated: boolean;
    user?: any;
    loading?: boolean;
    error?: string;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: '',
    loading: false,
    error: '',
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = '';
    },
    loginSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loginFailed: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutStart: (state) => {
      state.loading = true;
      state.error = '';
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = '';
    },
    logoutFailed: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const login = (username: string) => async (dispatch: any) => {
  dispatch(loginStart());

  try {
    const response = await axios.post("http://127.0.0.1:8000/api/login/", {
      username: username
    }, {
      headers: { "Content-Type": "application/json" }
    });
    
    dispatch(loginSuccess(response.data));
  } catch {
    dispatch(loginFailed("An error occurred"));
  }
}

export const logout = (refreshToken: string, accessToken: string) => async (dispatch: any) => {
  dispatch(logoutStart());

  try {
    await axios.post("http://127.0.0.1:8000/api/logout/",{
      refresh: refreshToken
    }, {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        }
    });

    dispatch(logoutSuccess());
  } catch {
    dispatch(logoutFailed("An error occurred"));
  }
}

export const { loginStart, loginSuccess, loginFailed, logoutStart, logoutSuccess, logoutFailed } = authSlice.actions;
export default authSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UserListState {
    userList: any[];
    loading?: boolean;
    error?: string;
}

const initialState: UserListState = {
    userList: [],
    loading: false,
    error: '',
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        fetchUserListStart: (state) => {
            state.loading = true;
            state.error = '';
        },
        fetchUserListSuccess: (state, action: PayloadAction<any[]>) => {
            state.loading = false;
            state.userList = action.payload;
        },
        fetchUserListFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export const fetchUserList = (accessToken: string) => async (dispatch: any) => {
    dispatch(fetchUserListStart());

    try {
        const response = await axios.get("http://127.0.0.1:8000/api/users/", {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        });

        dispatch(fetchUserListSuccess(response.data));
    } catch (error: any) {
        dispatch(fetchUserListFailed(error.message));
    }
}

export const { fetchUserListStart, fetchUserListSuccess, fetchUserListFailed } = userSlice.actions;
export default userSlice.reducer;
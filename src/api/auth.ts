import api from "./axios";
import axios from "axios";

export const authAPI = {
  login: async (username: string) => {
    try {
      return await axios.post(
        "http://127.0.0.1:8000/api/login/",
        { username },
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  logout: async (refreshToken: string, accessToken: string) => {
    try {
      return await axios.post(
        "http://127.0.0.1:8000/api/logout/",
        { refresh: refreshToken },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  },

  refreshToken: async (refreshToken: any) => {
    try {
      return await api.post("/token/refresh/", {
        refresh: refreshToken,
      });
    } catch (error) {
      console.error("Refresh token error:", error);
      throw error;
    }
  },
};

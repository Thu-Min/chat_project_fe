import api from "./axios";
import axios from "axios";

export const authAPI = {
  login: async (username: string) => {
    return axios.post(
      "http://127.0.0.1:8000/api/login/",
      { username },
      { headers: { "Content-Type": "application/json" } }
    );
  },

  logout: async (refreshToken: string, accessToken: string) => {
    return axios.post(
      "http://127.0.0.1:8000/api/logout/",
      { refresh: refreshToken },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
  },

  refreshToken: async (refreshToken: any) => {
    return api.post("/token/refresh/", {
      refresh: refreshToken,
    });
  },
};

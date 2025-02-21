import { store } from "../store/store";
import { refreshToken } from "../store/slices/authSlice";

let refreshInterval: any = null;

export const startTokenRefresh = (intervalMinutes: number = 4) => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }

  refreshInterval = setInterval(async () => {
    const state = store.getState();
    if (state.auth.isAuthenticated && state.auth.user.refreshToken) {
      try {
        await store.dispatch(refreshToken(state.auth.user.refreshToken));
      } catch (error) {
        console.error("Failed to refresh token:", error);
      }
    }
  }, intervalMinutes * 60 * 1000);
};

export const stopTokenRefresh = () => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
    refreshInterval = null;
  }
};

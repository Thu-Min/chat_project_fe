import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "../store/slices/authSlice";
import { AppDispatch, RootState } from "../store/store";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const accessToken = useSelector((state: RootState) => state.auth.user.access);
  const refreshTokenValue = useSelector(
    (state: RootState) => state.auth.user.refreshToken
  );

  useEffect(() => {
    if (accessToken && refreshToken) {
      const refreshInterval = setInterval(() => {
        dispatch(refreshToken(refreshTokenValue));
      }, 4 * 60 * 1000);

      return () => clearInterval(refreshInterval);
    }
  }, [accessToken, refreshToken, dispatch]);

  return <>{children}</>;
};

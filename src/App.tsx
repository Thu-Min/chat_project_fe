import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import "./index.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";
import { logout } from "./store/slices/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const refreshToken = useSelector(
    (state: RootState) => state.auth.user.refresh
  );
  const accessToken = useSelector((state: RootState) => state.auth.user.access);

  const handleLogout = () => {
    dispatch(logout(refreshToken, accessToken));
  };

  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-lg font-bold">
            <Link to="/">Chat Project</Link>
          </div>
          <div className="space-x-4">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="text-gray-300 hover:text-white">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;

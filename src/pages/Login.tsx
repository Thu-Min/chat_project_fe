import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { login } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await dispatch(login(username));
      navigate("/");
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 w-1/4 mx-auto mt-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-4 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
        <span className="text-xs text-red-500 text-center">
          You can add username and login even if you don't have account.
        </span>
      </form>
    </div>
  );
};

export default Login;

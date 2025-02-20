import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import {
  fetchOnlineUserList,
  fetchOfflineUserList,
} from "../store/slices/userSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Community = () => {
  const dispatch = useDispatch<AppDispatch>();
  const onlineUserList = useSelector(
    (state: RootState) => state.user.onlineUserList
  );
  const offlineUserList = useSelector(
    (state: RootState) => state.user.offlineUserList
  );
  const accessToken = useSelector((state: RootState) => state.auth.user.access);

  useEffect(() => {
    dispatch(fetchOnlineUserList(accessToken));
  }, [dispatch, accessToken]);

  useEffect(() => {
    dispatch(fetchOfflineUserList(accessToken));
  }, [dispatch, accessToken]);

  return (
    <div className="flex flex-col space-y-6 p-4">
      <div>
        <h2 className="text-gray-400 text-sm font-semibold mb-3 px-2">
          Active Users ({onlineUserList.length})
        </h2>
        <div className="space-y-2">
          {onlineUserList.map((user: any) => (
            <div
              key={user.id}
              className="flex items-center space-x-3 p-2 hover:bg-gray-800 rounded-lg cursor-pointer transition-colors duration-200"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white">
                  {user.username[0].toUpperCase()}
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
              </div>
              <div className="flex-1">
                <span className="text-white font-medium">{user.username}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-gray-400 text-sm font-semibold mb-3 px-2">
          Offline Users ({offlineUserList.length})
        </h2>
        <div className="space-y-2">
          {offlineUserList.map((user: any) => (
            <div
              key={user.id}
              className="flex items-center space-x-3 p-2 hover:bg-gray-800 rounded-lg cursor-pointer transition-colors duration-200"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white">
                  {user.username[0].toUpperCase()}
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-500 rounded-full border-2 border-gray-900"></div>
              </div>
              <div className="flex-1">
                <span className="text-gray-400 font-medium">
                  {user.username}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {onlineUserList.length === 0 && offlineUserList.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10 text-gray-400">
          <p className="text-center">No users available</p>
        </div>
      )}
    </div>
  );
};

export default Community;

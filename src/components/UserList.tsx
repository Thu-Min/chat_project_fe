import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import {
  fetchOnlineUserList,
  fetchOfflineUserList,
} from "../store/slices/userSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const UserList = () => {
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
    <div className="flex flex-col space-y-4">
      <div>
        <p className="text-xl font-semibold mb-2">Online</p>
        <ul className="bg-green-200">
          {onlineUserList.map((user: any) => (
            <li key={user.id} className="p-4 border-b last:border-none">
              <span className="font-bold">{user.username}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-xl font-semibold mb-2">Offline</p>
        <ul className="bg-gray-200">
          {offlineUserList.map((user: any) => (
            <li key={user.id} className="p-4 border-b last:border-none">
              <span className="font-bold">{user.username}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserList;

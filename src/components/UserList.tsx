import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { fetchUserList } from "../store/slices/userSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const UserList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const userList = useSelector((state: RootState) => state.user.userList);
    const accessToken = useSelector((state: RootState) => state.auth.user.access);

    useEffect(() => {
        dispatch(fetchUserList(accessToken));
    }, [dispatch, accessToken]);
    

    return (
        <div>
            <ul>
                {userList.map((user: any) => (
                    <li key={user.id} className="p-4 border-b">
                        <span className="font-bold">{user.username}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default UserList;
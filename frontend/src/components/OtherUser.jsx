import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelecterdUser } from "../Redux/userSlice";
function Otheruser({ user }) {
  const dispatch = useDispatch();
  const { selectedUser, onlineUser } = useSelector((store) => store.user);
  const isOnline = onlineUser?.includes(user._id);
  const SelectedHandler = (user) => {
    // console.log(user);
    dispatch(setSelecterdUser(user));
  };
  return (
    <>
      <div
        onClick={() => SelectedHandler(user)}
        className={`${
          selectedUser?._id === user?._id ? "bg-zinc-200 text-zinc-700" : ""
        } flex gap-2   items-center text-white   hover:text-zinc-800 hover:bg-zinc-200 text-black py-1 rounded-sm cursor-pointer `}
      >
        <div className={`avatar ${isOnline ? "online" : ""} `}>
          <div className="w-10 rounded-full">
            <img src={user.profilePhoto} alt="user-profile" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-2 justify-between flex-1">
            <p className="">{user.fullName}</p>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0"></div>
    </>
  );
}

export default Otheruser;

import React, { useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { setSelecterdUser } from "../Redux/userSlice";
function Messagecontainer() {
  const { selectedUser, authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => dispatch(setSelecterdUser(null));
  }, []);
  return (
    <>
      {selectedUser !== null ? (
        <div className="md:min-w-[550px]  flex  flex-col p-5">
          <div className="flex gap-2  items-center bg-zinc-800 text-white px-4 py-2 mb-2  ">
            <div className="avatar online ">
              <div className="w-10 rounded-full">
                <img src={selectedUser?.profilePhoto} alt="user-profile" />
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex gap-2 justify-between flex-1">
                <p>{selectedUser?.fullName}</p>
              </div>
            </div>
          </div>
          <Messages></Messages>
          <SendInput></SendInput>
        </div>
      ) : (
        <div className="md:min-w-[550px] flex flex-col justify-center items-center">
          <p className="text-white text-4xl font-bold">
            Hi {authUser.username}
          </p>
          <h1 className="text-2xl text-white">Let's start conversation</h1>
        </div>
      )}
    </>
  );
}

export default Messagecontainer;

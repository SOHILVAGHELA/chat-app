import React from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useSelector } from "react-redux";
function Messagecontainer() {
  const { selectedUser } = useSelector((store) => store.user);
  return (
    <>
      {selectedUser !== null ? (
        <div className="md:min-w-[450px]  flex  flex-col p-5">
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
        <h1>Let's start conversation</h1>
      )}
    </>
  );
}

export default Messagecontainer;

import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function Message({ message }) {
  const scroll = useRef();
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  const { authUser, selectedUser } = useSelector((store) => store.user);
  return (
    <div
      ref={scroll}
      className={`chat ${
        authUser?._id === message?.senderId ? "chat-end" : "chat-start"
      }`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="user-profile"
            src={
              authUser?._id === message?.senderId
                ? authUser?.profilePhoto
                : selectedUser?.profilePhoto
            }
          />
        </div>
      </div>
      <div className="chat-header">
        <time className="text-xs opacity-50 text-white">12:45</time>
      </div>
      <div className="chat-bubble">{message?.message}</div>
    </div>
  );
}

export default Message;

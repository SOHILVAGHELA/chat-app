import React from "react";
import Message from "./Message";
import usegetMessages from "../Hooks/usegetMessages";
import { useSelector } from "react-redux";

function Messages() {
  usegetMessages();
  const { messages } = useSelector((store) => store.message);
  if (!messages) return;
  return (
    <div className="px-4 flex-1 overflow-auto">
      {messages?.map((message) => (
        <Message key={message._id} message={message} />
      ))}
    </div>
  );
}

export default Messages;

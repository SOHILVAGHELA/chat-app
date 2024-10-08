import React from "react";
import Message from "./Message";
import usegetMessages from "../Hooks/usegetMessages";
import { useSelector } from "react-redux";
import useGetRealTimeMessage from "../Hooks/useGetRealTimeMessage";

function Messages() {
  usegetMessages();
  useGetRealTimeMessage();

  const { messages } = useSelector((store) => store.message);
  // if (!messages) return;
  return (
    <div className="px-4 flex-1 overflow-auto">
      {messages &&
        messages?.map((message) => (
          <Message key={message._id} message={message} />
        ))}
    </div>
  );
}

export default Messages;

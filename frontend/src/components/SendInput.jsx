import axios from "axios";
import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../Redux/messageSlice";

function SendInput() {
  const [message, setMessage] = useState("");
  const { selectedUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    // console.log(message);
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `http://localhost:4004/api/v1/message/send/${selectedUser?._id}`,
        { message }
      );
      console.log(res);
      dispatch(setMessages([...messages, res?.data?.newMassage]));
      setMessage("");
    } catch (error) {}
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex rounded-lg shadow-sm">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          id="hs-search-box-with-loading-2"
          name="hs-search-box-with-loading-2"
          className="py-3 px-4 block w-full border-gray-200 shadow-sm rounded-s-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          placeholder="Send a message   "
        />
        <button
          type="submit"
          className="w-[2.875rem] h-[2.875rem] shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
        >
          <IoSend />
        </button>
      </div>
    </form>
  );
}

export default SendInput;

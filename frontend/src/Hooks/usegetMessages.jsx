import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../Redux/messageSlice";
import { BASE_URL } from "../main";

function usegetMessages() {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  useEffect(() => {
    const fetchMessaegs = async () => {
      if (!selectedUser?._id) return; // Ensure selectedUser._id exists
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `${BASE_URL}/api/v1/message/${selectedUser?._id}`
        );
        // console.log(res.data);
        console.log(res.response.data);
        dispatch(setMessages(res.data));
      } catch (error) {
        if (error.response) {
          console.error("Error fetching messages:", error.response.data);
        } else {
          console.error("Error:", error.message);
        }
      }
    };
    fetchMessaegs();
  }, [selectedUser?._id]);
}

export default usegetMessages;

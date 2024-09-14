import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function usegetMessages() {
  const { selectedUser } = useSelector((store) => store.user);
  useEffect(() => {
    const fetchMessaegs = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `http://localhost:4004/api/v1/message/${selectedUser?._id}`
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessaegs();
  }, [selectedUser?._id]);
}

export default usegetMessages;

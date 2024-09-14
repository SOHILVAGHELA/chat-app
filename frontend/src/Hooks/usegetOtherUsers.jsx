import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOtherUser } from "../Redux/userSlice";
function usegetOtherUsers() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get("http://localhost:4004/api/v1/user/");
        dispatch(setOtherUser(res.data));
        // console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);
}

export default usegetOtherUsers;

import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOtherUser } from "../Redux/userSlice";
import { BASE_URL } from "../main";
function usegetOtherUsers() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`${BASE_URL}/api/v1/user/`);
        console.log(res);
        dispatch(setOtherUser(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);
}

export default usegetOtherUsers;

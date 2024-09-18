import React, { useState } from "react";
import Otherusers from "./Otherusers";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setOtherUser } from "../Redux/userSlice";
function Sidebar() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { otherUser } = useSelector((store) => store.user);
  const navigate = useNavigate();

  const HandleSubmit = (e) => {
    e.preventDefault();
    // console.log(search);
    const conversationUser = otherUser?.find((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (conversationUser) {
      dispatch(setOtherUser([conversationUser]));
    } else {
      toast.error("User not Found");
    }
  };
  const Logout = async () => {
    try {
      const res = await axios.get("http://localhost:4004/api/v1/user/logout");
      console.log(res);
      navigate("/login");
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
    } catch (error) {}
  };
  return (
    <div className="border-r border-slate-500 p-5 flex flex-col ">
      <form onSubmit={HandleSubmit}>
        <div className="flex rounded-lg shadow-sm">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            id="hs-leading-button-add-on-with-icon"
            name="hs-leading-button-add-on-with-icon"
            className="py-3 px-4 block w-full border-gray-200 shadow-sm text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            type="submit"
            className="w-[2.875rem] h-[2.875rem] shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-semibold border border-transparent bg-zinc-400 text-white hover:bg-zinc-700 focus:outline-none focus:bg-zinc-700 disabled:opacity-50 disabled:pointer-events-none"
            aria-label="Search button"
          >
            <svg
              className="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </button>
        </div>
      </form>
      <div className="divider px-3"></div>
      <Otherusers></Otherusers>
      <div className="mt-2">
        <button onClick={Logout} className="btn btn-sm">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;

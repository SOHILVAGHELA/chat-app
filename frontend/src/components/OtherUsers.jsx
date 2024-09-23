import React from "react";
import Otheruser from "./Otheruser";
import usegetOtherUsers from "../Hooks/usegetOtherUsers";
import { useSelector } from "react-redux";

function Otherusers({ userList }) {
  //custom hook
  usegetOtherUsers();

  // if (!userList) return;

  return (
    <div className="overflow-auto flex-1">
      {userList?.map((user) => (
        <Otheruser key={user._id} user={user} />
      ))}
    </div>
  );
}

export default Otherusers;

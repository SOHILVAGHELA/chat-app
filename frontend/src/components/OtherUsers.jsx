import React from "react";
import Otheruser from "./Otheruser";
import usegetOtherUsers from "../Hooks/usegetOtherUsers";
import { useSelector } from "react-redux";
useSelector;
function Otherusers() {
  //custom hook
  usegetOtherUsers();
  const { otherUser } = useSelector((store) => store.user);
  //   console.log("log", otherUser);
  if (!otherUser) return;

  return (
    <div className="overflow-auto flex-1">
      {otherUser?.map((user) => (
        <Otheruser key={user._id} user={user} />
      ))}
    </div>
  );
}

export default Otherusers;

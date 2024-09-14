import React from "react";
import Sidebar from "./Sidebar";
import Messagecontainer from "./Messagecontainer";
function Homepage() {
  return (
    <>
      <div className="flex sm:h-[400px] md:h-[550px] bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
        <Sidebar />
        <Messagecontainer></Messagecontainer>
      </div>
    </>
  );
}

export default Homepage;

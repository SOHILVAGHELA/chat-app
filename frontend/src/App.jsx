import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { setSocket } from "./Redux/socketSlice";
import io from "socket.io-client";
import { setOnlineUser } from "./Redux/userSlice";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage></Homepage>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <SignUp></SignUp>,
  },
]);
function App() {
  const dispatch = useDispatch();
  const { authUser } = useSelector((store) => store.user);
  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:4004", {
        query: { userId: authUser._id },
      });
      dispatch(setSocket(socket));
      socket.on("getOnlineUsers", (onlineUser) => {
        dispatch(setOnlineUser(onlineUser));
      });
      return () => socket.close();
    }
  }, [authUser]);
  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center">
        <RouterProvider router={router}></RouterProvider>
      </div>
    </>
  );
}

export default App;

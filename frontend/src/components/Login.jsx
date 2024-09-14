import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../Redux/userSlice";
function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:4004/api/v1/user/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setLoading(false);
      navigate("/");
      dispatch(setAuthUser(res.data));
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.response.data.Message);
    }
    console.log(user);

    setUser({ username: "", password: "" });
  };
  return (
    <>
      <div className="min-w-96  mx-auto">
        <div className="p-6 h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
          <h1 className="text-3xl font-bold text-center text-gray-300">
            Login
          </h1>
          <form onSubmit={handleSubmit} action="">
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Username</span>
              </label>
              <input
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="w-full input input-bordered h-10"
                type="text"
                placeholder="Enter Username"
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Password</span>
              </label>
              <input
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="w-full input input-bordered h-10"
                type="password"
                placeholder="Password"
              />
            </div>

            <div className="text-center my-1">
              <Link to="/register">Don't have Account? Register</Link>
            </div>
            <div>
              <button type="submit" className="btn btn-block btn-outline">
                {loading ? <Spinner></Spinner> : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { BASE_URL } from "../main";

function SignUp() {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenderChange = (e) => {
    setUser({ ...user, gender: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !user.fullName ||
      !user.gender ||
      !user.password ||
      !user.confirmPassword ||
      !user.username
    ) {
      return toast.error("Please fill in all fields");
    }
    if (user.password !== user.confirmPassword) {
      return toast.error("Password do not Match");
    }
    setLoading(true);

    console.log(user);
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/register`, user, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      console.log(res);
      if (res.data.success) {
        setLoading(false);
        toast.success(res.data.Message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.Message);
    }

    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };

  return (
    <div className="min-w-96 mx-auto">
      <div className="p-6 h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-gray-300">
          Register
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="Enter Your Name"
            />
          </div>
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
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              className="w-full input input-bordered h-10"
              type="password"
              placeholder="Confirm Password"
            />
          </div>

          <div className="flex items-center my-2">
            <div className="flex items-center">
              <label className="mr-2">
                <input
                  type="radio"
                  value="male"
                  checked={user.gender === "male"}
                  onChange={handleGenderChange}
                  className="mr-1"
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  value="female"
                  checked={user.gender === "female"}
                  onChange={handleGenderChange}
                  className="mr-1"
                />
                Female
              </label>
            </div>
          </div>
          <div className="text-center my-1">
            <Link to="/login">Already have an Account? Login</Link>
          </div>
          <div>
            <button type="submit" className="btn btn-block btn-outline">
              {loading ? <Spinner></Spinner> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

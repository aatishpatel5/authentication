import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { serverUrl } from "../App";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

function Login() {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    setLoading(true);

    try {
      console.log(` error checking 1 login.jsx `);
      const result = await axios.post(
        `${serverUrl}/api/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      dispatch(setUserData(result.data));
      setLoading(false);
      setError("");
    } catch (error) {
      setLoading(false);

      console.log(error);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-2 ">
      <div
        className="{`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border "
        style={{
          border: `1px solid ${borderColor}`,
        }}
      >
        <h1
          className={`text-orange-500 font-bold mb-2`}
          style={{ color: primaryColor }}
        >
          FDPro
        </h1>
        <p className="text-gray-600 mb-4">
          Login to your account to get started with delicious food deliveries
        </p>

        {/* Email  */}
        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1"
          >
            Email
          </label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-1 focus:outline-none "
            placeholder="Enter your email"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        {/* Password  */}
        <div>
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={`${showPassword ? "text" : "password"}`}
              className="w-full border rounded-lg px-3 py-1 focus:outline-none "
              placeholder="Enter your password"
              style={{ border: `1px solid ${borderColor}` }}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}

            </button>
          </div>
        </div>
        <div>
          <Link
            className="flex justify-end hover:underline p-1 text-[#ff4d2d] font-medium cursor-pointer"
            to={"/forgot-password"}
          >
            Forgot Password
          </Link>
        </div>

        <button
          className={`w-full flex items-center justify-center gap-2 border rounded-lg px-2 py-1 my-4 transition duration-200 bg-[#f95437] hover:bg-[#e64323] `}
          onClick={handleLogin}
        >
          {loading ?  <ClipLoader/> : "SignIn" }
        </button>
                <p className="text-red-500 ">{err}</p>


        <p className="flex justify-center mt-4 ">
          Create a new account ?
          <Link to={"/signup"}>
            <span className="text-[#ff4d2d] underline cursor-pointer ml-1">
              SignUp
            </span>
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}
export default Login;

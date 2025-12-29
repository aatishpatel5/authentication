import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { serverUrl } from "../App";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { Link } from "react-router-dom";
import {ClipLoader} from "react-spinners";


function SignUp() {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("User");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
    const [err, setErr] = useState("");

 
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    console.log("error check signUp.jsx")
        setLoading(true);
console.log("error check signUp.jsx")
    try {
  console.log("error check signUp.jsx")
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        {
          fullName,
          email,
          password,
          role,
        },
        { withCredentials: true }
      );
  console.log("error check signUp.jsx")
setStep(2) 
      console.log("result is : --->>>",result) 
 setLoading(false);
    } catch (error) {
    setLoading(false);
      setErr(error.response.data.message); 
          console.log(error.response.data.message);
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault();


    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/verify-signup`,
        { otp, fullName, email, password, role },
        { withCredentials: true }
      )

      dispatch(setUserData(result.data));
    } catch (error) {

        console.log("Server Response error:", error.response.data);
     
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-2 "
      style={{ backgroundColor: bgColor }}
    >
      {step == 1 && (
        <div
          className="{`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border "
          style={{
            border: `1px solid ${borderColor}`,
          }}
        >
          <h1
            className={`text-3xl font-bold mb-2`}
            style={{ color: primaryColor }}
          >
         Authentication
          </h1>

          {/* fullName  */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-gray-700 font-medium mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-1 focus:outline-none "
              placeholder="Enter your full name"
              style={{ border: `1px solid ${borderColor}` }}
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              required
            />
          </div>
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

          {/* Role  */}
          <div>
            <label
              htmlFor="role"
              className="block text-gray-700 font-medium mb-1"
            >
              Role
            </label>
            <div className="flex gap-4">
              {["User", "Owner", "DeliveryBoy"].map((r) => (
                <button
                  className="flex-1 rounded-lg p-1  text-center font-medium transition-colors border"
                  onClick={() => setRole(r)}
                  style={
                    role == r
                      ? { backgroundColor: primaryColor, color: "white" }
                      : {
                          border: `1px solid ${primaryColor}`,
                          color: primaryColor,
                          width: "100%",
                        }
                  }
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <button
            className={`w-full flex items-center justify-center gap-2 border rounded-lg px-2 py-1 my-4 transition duration-200 bg-[#f95437] hover:bg-[#e64323] `}
            onClick={handleSignUp}
            disabled={loading}
          >
         SignUp
          </button>
                  <p className="text-red-500 text-center ">{err}</p>

          <p className="flex justify-center mt-4 ">
            Already have an account ?{" "}
            <Link to={"/login"}>
              <span className="text-[#ff4d2d] underline cursor-pointer ml-1">
                logIn
              </span>
            </Link>{" "}
          </p>
        </div>
      )}

      {step == 2 && (
        <div>
          <div className="my-5">
            <label
              htmlFor="otp"
              className="block text-gray-700 font-medium mb-1"
            >
              OTP
            </label>
            <input
              type="otp"
              className="w-full border border-gray-200 rounded-lg px-3 py-1 focus:outline-none "
              placeholder="Enter OTP "
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              required
            />
          </div>
          <button
            className={`w-full flex items-center justify-center gap-2 border rounded-lg px-2 py-1 my-4 transition duration-200 bg-[#f95437] hover:bg-[#e64323] `}
            onClick={handleVerifyOtp}
          >
            Verify
          </button>
        </div>
      )}
    </div>
  );
}

export default SignUp;

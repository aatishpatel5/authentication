import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import axios from "axios";
import { ClipLoader } from "react-spinners";

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); 

  const handleSendOtp = async () => {
    setLoading(true);
    try { 
      const result = await axios.post(`${serverUrl}/api/auth/send-otp`, { email }, { withCredentials: true } );
      console.log(result);

      setStep(2);
      setLoading(false);
    } catch (error) {
      setLoading(false);  
      setErr(error.response.data.message)
      console.log(error);
    }
  };
  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      console.log("error 1 testing")
      const result = await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        { email, otp },
        { withCredentials: true }
      );
      console.log(result);
      setStep(3);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErr(error.response.data.message)
      console.log(error.response.data.message)
      console.log(error);

    }
  };
  const handleResetPassword = async () => {
    setLoading(true);
    if (newPassword != confirmPassword) {
      setLoading(false);
      return null;
    }

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        { email, newPassword },
        { withCredentials: true }
      );  
      console.log(result);
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      setErr(error.response.data.message)
      console.log(error);
    }
  };

  return (
    <div className="flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-xl w-full shadow-lg max-w-md p-8">
        <div className="flex items-center gap-3">
          <IoMdArrowRoundBack
            onClick={() => navigate("/login")}
            size={30}
            className="mr-4 cursor-pointer hover:text-black text-gray-900"
          />
          <h1 className="text-2xl font-bold text-center text-[#ff4d2d]">
            Forgot Password
          </h1>
        </div>
        {step == 1 && (
          <div>
            <div className="my-5">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full border border-gray-200 rounded-lg px-3 py-1 focus:outline-none "
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required  
              />
            </div>
            <p className="text-red-500">{err}</p>
            <button
              className={`w-full flex items-center justify-center gap-2 border rounded-lg px-2 py-1 my-4 transition duration-200 bg-[#f95437] hover:bg-[#e64323] `}
              onClick={handleSendOtp}
            >
           {loading ? <ClipLoader/> : "Send OTP"  }
            </button>
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
                required              />
            </div>
            <p className="text-red-500">{err}</p>
            <button
              className={`w-full flex items-center justify-center gap-2 border rounded-lg px-2 py-1 my-4 transition duration-200 bg-[#f95437] hover:bg-[#e64323] `}
              onClick={handleVerifyOtp}
            >
           {loading ? <ClipLoader/> : "Verify"  }
            </button>
          </div>
        )}

        {step == 3 && (
          <div>
            <div className="my-5">
              <label
                htmlFor="newPassword"
                className="block text-gray-700 font-medium mb-1"
              >
                New Password
              </label>
              <input
                type="newPassword"
                className="w-full border border-gray-200 rounded-lg px-3 py-1 focus:outline-none "
                placeholder="Enter new password"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
            </div> 
            <div className="my-5">
              <label
                htmlFor="confirmNewPassword"
                className="block text-gray-700 font-medium mb-1"
              >
                Confirm New Password
              </label>
              <input
                type="confirmPassword"
                className="w-full border border-gray-200 rounded-lg px-3 py-1 focus:outline-none "
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
              />
            </div>
            <p className="text-red-500">{err}</p>
            <button
              className={`w-full flex items-center justify-center gap-2 border rounded-lg px-2 py-1 my-4 transition duration-200 bg-[#f95437] hover:bg-[#e64323] `}
              onClick={handleResetPassword}
            >
              {loading ? <ClipLoader/> : "Reset Password" }
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;

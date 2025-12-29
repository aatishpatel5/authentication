import axios from "axios";
import React from "react";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import {  setUserData } from "../redux/userSlice";

function Home() {
  const dispatch = useDispatch();

  
     const handleLogOut = async () => {
        try {
            const result = await axios.post(`${serverUrl}/api/auth/logoutsite`,{}, { withCredentials: true })
            dispatch(setUserData(null))
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }



  return (
    <div className="text-3xl font-bold text-orange-500 text-center  ">
      <h1>Home page for testing</h1>
      <button
        onClick={handleLogOut}
        className="hover:bg-orange-600 text-white bg-orange-500 py-1 px-2 my-4 rounded-lg"
      >
        logOut
      </button>
    </div>
  );
}

export default Home;

import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login';
import Home from './pages/Home';
import userGetCurrentUser from './hooks/useGetCurrentUser';
import { useSelector } from 'react-redux';
import ForgotPassword from './pages/ForgotPassword';

export const serverUrl = "http://localhost:8000";

function App() { 
  userGetCurrentUser()

  const {userData} = useSelector((state) => state.user)

  console.log(`check in app.jsx me of userdata: `,userData)

  return (
   <Routes>
<Route path='/signup' element={!userData? <SignUp/>:<Navigate to="/"/>} />
<Route path='/login' element={!userData? <Login/>: <Navigate to="/"/> }/>
<Route path='/' element={userData?<Home/>:<Navigate to="/login"/>}/>
<Route path='/forgot-password' element={!userData ? <ForgotPassword/>:<Navigate to="/"/>} />
<Route path='/' element={userData? <Home/>:<Navigate to={"/login"}/>} />

   </Routes>
  )
}

export default App
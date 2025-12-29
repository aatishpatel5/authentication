import express from "express"
import { initiateSignup, logIn, logOutSite, resetPassword, sendOtp, verifyOtp, verifyOtpAndSignup } from "../controllers/authControllers.js"

const authRouter = express.Router()

authRouter.post("/signup",initiateSignup )
authRouter.post("/verify-signup", verifyOtpAndSignup)
authRouter.post("/login", logIn)
authRouter.post("/logoutsite", logOutSite)
authRouter.post("/send-otp", sendOtp)
authRouter.post("/verify-otp", verifyOtp)
authRouter.post("/reset-password", resetPassword)


export default authRouter;
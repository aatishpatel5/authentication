import User from "../models/userModel.js";
import { sendOtpMail } from "../utils/mail.js";
import tokenGenrate from "../utils/token.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

export const initiateSignup = async (req, res) => {

  try {
    console.log(`error 1 in authcontrollers initiateSignup`);
    const { fullName, email, password, role } = req.body;

    if (!email.endsWith("@gmail.com")) {
      return res
        .status(400)
        .json({ message: "Invalid email format. Please use a Gmail address." });
    }

    let user = await User.findOne({ email });

    if (user && user.isOtpVerified) {
      return req.status(400).json({ message: "User already exist." });
    }

    if (password.length < 4) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Verify account process to send otp
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // const salt = await bcrypt.genSalt(10);
    // const hashedOtp = await bcrypt.hash(otp, salt);
    // user.resetOtp = otp;
    const otpExpires = Date.now() + 30 * 60 * 1000;

    if (user) {
      user.fullName = fullName;
      user.password = hashedPassword;
      user.resetOtp = otp;
      user.otpExpires = otpExpires;
      await user.save;
    } else {
      await User.create({
        fullName,
        email,
        password: hashedPassword,
        resetOtp: otp,
        otpExpires,
        role,
        isVerified: false,
      });
    }
      if (password.length == 5) {
      return res.status(400).json({
        message:
          "Password equels to 5.",
      });
    }

    await sendOtpMail(email, otp);

    res.status(200).json({
      success: true,
      message: "OTP sent to your email. Please verify.",
    });

    // user.verifyOtp = otp;
    // user.isVerified = false;
    // await user.save();
  } catch (error) {
    return res
      .status(500)
      .json(`Server Error during SignUp Initiation : ${error}`);
  }
};

export const verifyOtpAndSignup = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const providedOtpString = String(otp);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // if(user.isOtpVerified){
    //   console.log("error in isOtpVerify tru ho to")
    //     return res.status(400).json({message: "User already verified. Please Login."})
    // }

    if (user.otpExpires < Date.now()) {
    
      return res
        .status(400)
        .json({ message: "OTP expired. Please request a new one." });
    }

    if (user.resetOtp != providedOtpString) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = await tokenGenrate(user._id);
     res.cookie("token", token, {
  httpOnly: true,
  secure: true ,// Production me TRUE, Localhost par FALSE
  sameSite: "none", // Cross-site cookie ke liye 'none' zaroori hai
  maxAge: 7 * 24 * 60 * 60 * 1000
});

    return res.status(200).json(user);

    // console.log("token testing in signIn controller", token)

    // return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error during Verification" });
  }
};

export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email.endsWith("@gmail.com")) {
      return res
        .status(400)
        .json({ message: "Invalid email format. Please use a Gmail address." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist." });
    }

    if(user && !user.isOtpVerified){
     await User.findOneAndDelete({ email: email });
      return res.status(400).json({messaeg: "use not exist. please create a new account.11"})
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "incorrect password" });
    }

    const token = await tokenGenrate(user._id);
    res.cookie("token", token, {
      httpOnly: true,
  secure: true ,// Production me TRUE, Localhost par FALSE
  sameSite: "none",// Cross-site cookie ke liye 'none' zaroori hai
  maxAge: 7 * 24 * 60 * 60 * 1000
    });

    // console.log("token testing in signIn controller", token)

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(`signIn error: ${error}`);
  }
};

export const logOutSite = async (req, res) => {
  console.log("error check 0 in logOut controllers");

  try {

    const cookieOption = {
       httpOnly: true,
  secure: true ,// Production me TRUE, Localhost par FALSE
  sameSite: "none" ,// Cross-site cookie ke liye 'none' zaroori hai
  maxAge: 7 * 24 * 60 * 60 * 1000,
    };
    res.clearCookie("token", cookieOption);

    return res.status(200).json({ message: "logOut successfully" });
  } catch (error) {
    return res.status(500).json(`logOut error ${error}`);
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email.endsWith("@gmail.com")) {
      return res.status(400).json({ message: "Invalid email  format." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
   
    await user.save();
    await sendOtpMail(email, otp);

    return res.status(200).json({ message: "otp send successfully" });
  } catch (error) {
    return res.status(500).json(`send otp error ${error}`);
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.resetOtp != otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "invalid/expired otp" });
    }

    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return res.status(200).json({ message: "otp verify successfully" });
  } catch (error) {
    return res.status(500).json(`verify otp error ${error}`);
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    // user.isOtpVerified = false;
    await user.save();
    return res.status(200).json({ messaeg: "password reset successfully" });
  } catch (error) {
    return res.status(500).json(`reset password error  ${error}`);
  }
};

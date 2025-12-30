import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
host:"smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export const sendOtpMail = async (to, otp) => {
 try{
  const info = await transporter.sendMail({
      from: `"My App Name" <${process.env.EMAIL}>`, // Professional look
      to,
      subject: "Verify your account",
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Account Verification</h2>
          <p>Your OTP is: <b style="color: blue; font-size: 18px;">${otp}</b></p>
          <p>It expires in 5 minutes.</p>
        </div>
      `,
    });
  return true;}
 catch(error){
  console.error("Email Sending Failed:", error.message);
    return false;
 }
};

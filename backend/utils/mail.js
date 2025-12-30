import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail", // Explicit service use karein
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
  // POOLING: Ye connection ko zinda rakhta hai
  pool: true, 
  maxConnections: 1,
  rateLimit: 3, // 1 second me max 3 emails (Google limit avoid karne ke liye)
  
  // Timeout settings badhayein
  connectionTimeout: 20000, // 20 seconds
  greetingTimeout: 20000,
  socketTimeout: 20000,
});

export const sendOtpMail = async (to, otp) => {
  try {
    console.log(`⏳ Attempting to send OTP to ${to}...`);
    
    const info = await transporter.sendMail({
      from: `"Support Team" <${process.env.EMAIL}>`,
      to,
      subject: "Verify your account",
      html: `<p>Your OTP is: <b>${otp}</b></p>`,
    });

    console.log("✅ Email Sent! ID:", info.messageId);
    return true;
  } catch (error) {
    console.error("❌ FINAL ERROR:", error);
    return false;
  }
};

import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,             // Industry Standard for modern cloud hosting
  secure: false,         // False = STARTTLS (Upgrades to Encrypted Connection)
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS, // Spaces nahi hone chahiye
  },
  // Network Settings for Reliability on Render
  tls: {
    ciphers: "SSLv3",    // Compatibility fix
  },
  family: 4,             // IMPORTANT: Force IPv4 (Fixes Render Timeout)
  
  // Timeout Settings (Server hang hone se rokega)
  connectionTimeout: 10000, // 10 seconds wait karega connection ke liye
  greetingTimeout: 5000,    // 5 seconds wait karega Gmail ke hello ke liye
  socketTimeout: 15000,     // 15 seconds max transaction time
});

// Verification Logic (Server start hote hi check karega)
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP Connection Error:", error.message);
  } else {
    console.log("✅ SMTP Server Connected & Ready (Secure)");
  }
});

export const sendOtpMail = async (to, otp) => {
  try {
    const info = await transporter.sendMail({
      from: `"Your App Name" <${process.env.EMAIL}>`, // Professional Sender Name
      to,
      subject: "Verify your account",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #333;">Account Verification</h2>
          <p>Your One-Time Password (OTP) is:</p>
          <h1 style="color: #007bff; letter-spacing: 2px;">${otp}</h1>
          <p style="font-size: 12px; color: #666;">This code expires in 5 minutes.</p>
        </div>
      `,
    });
    
    console.log(`✅ Email sent to ${to}. ID: ${info.messageId}`);
    return true;

  } catch (error) {
    // Ye error detail Render logs me dikhegi agar fail hua
    console.error("❌ Email Failed:", error);
    return false;
  }
};

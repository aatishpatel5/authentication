import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp-relay.brevo.com", // Brevo ka Host
  port: process.env.SMTP_PORT || 587, // Brevo ka Port
  secure: false, // Brevo ke liye False hi rakhein
  auth: {
    user: process.env.EMAIL, // Aapka Brevo Login Email
    pass: process.env.PASS,  // Brevo SMTP Key (Not Gmail Password)
  },
});

export const sendOtpMail = async (to, otp) => {
  try {
    console.log(`🚀 Sending email via Brevo to: ${to}`);
    
    const info = await transporter.sendMail({
      from: `"My App Support" <${process.env.EMAIL}>`, // Sender Name badhiya lagta hai
      to,
      subject: "Verify your account",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Your Verification Code</h2>
          <p style="font-size: 16px;">Here is your OTP:</p>
          <h1 style="color: #4CAF50;">${otp}</h1>
          <p>Valid for 5 minutes.</p>
        </div>
      `,
    });

    console.log("✅ Email sent successfully! Message ID:", info.messageId);
    return true;

  } catch (error) {
    console.error("❌ Email Error:", error);
    return false;
  }
};

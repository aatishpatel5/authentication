


import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Production me environment variables system se aate hain, par safe side ke liye config rakhein
dotenv.config();

const sendOtpMail = async (to, otp) => {
  try {
    // Step 1: Transporter Create karein
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // 'service: Gmail' HATANA hai
      port: 465,              // Secure SSL port
      secure: true,           // 465 ke liye true
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS, // App Password (NO SPACES)
      },
      // Production fix: TLS cipher issue solve karne ke liye
      tls: {
        rejectUnauthorized: false
      }
    });

    // Step 2: Verify Connection (Optional but good for debugging)
    await transporter.verify();
    console.log("✅ SMTP Server Connected Successfully");

    // Step 3: Mail Options
    const mailOptions = {
      from: `"Support Team" <${process.env.EMAIL}>`, 
      to: to,
      subject: "Your OTP Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Verify Your Account</h2>
          <p>Your OTP is: <b style="font-size: 20px; color: #007bff;">${otp}</b></p>
          <p>This code expires in 5 minutes.</p>
        </div>
      `,
    };

    // Step 4: Send Mail
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully ID:", info.messageId);
    return true;

  } catch (error) {
    console.error("❌ Email Sending Failed Error:", error);
    // Important: Error ko throw na karein, false return karein taaki server crash na ho
    return false;
  }
};

export { sendOtpMail };

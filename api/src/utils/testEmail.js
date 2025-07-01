require("dotenv").config(); // Load environment variables from .env file

const nodemailer = require("nodemailer");

async function testEmail() {
  const transporter = nodemailer.createTransport({
    host: "mail.focusbehevior.com",
    port: 587,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
    secure: false,
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USERNAME,
      to: "user@example.com", // Replace with the test recipient's email
      subject: "Testing Nodemailer from Strapi",
      text: "Hello! This is a test email sent from Strapi.",
    });

    console.log("✅ Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
}

// Run the test
testEmail();

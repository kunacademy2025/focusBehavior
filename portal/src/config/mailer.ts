// import nodemailer from "nodemailer";
// import { EMAIL_SUBSCRIBE } from "./config";

// const transporter = nodemailer.createTransport({
//   host: "smtp.postmarkapp.com",
//   port: 587,
//   auth: {
//     user: EMAIL_SUBSCRIBE,
//     pass: EMAIL_SUBSCRIBE,
//   },
//   secure: false,
//   headers: {
//     "X-PM-Tag": "",
//   },
// });

// export const sendEmail = async (
//   email: string,
//   subject: string,
//   text?: string,
//   html?: any
// ): Promise<void> => {
//   const mailOptions = {
//     from: process.env.EMAIL_FROM,
//     to: email,
//     subject,
//     text,
//     replyTo: email,
//     html,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.NEXT_API_KEY_SMTP_HOST,
  port: process.env.NEXT_API_KEY_SMTP_PORT,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.NEXT_API_KEY_SMTP_EMAIL,
    pass: process.env.NEXT_API_KEY_SMTP_PASS,
  },
});

const setMailOptions = (name, email, title, docsURL) => {
  return {
    from: process.env.NEXT_API_KEY_SMTP_EMAIL,
    to: email,
    subject: "Welcome to Andaihub",
    html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img 
              src="/newAndai.jpg" 
              alt="Andai Logo" 
              style="width: 150px; height: auto;" 
            />
          </div>
          <p>Hey <strong>${name}</strong>,</p>
          <p>Welcome to <strong>Andaihub</strong>! We're thrilled to have you here.</p>
          <p>Please sign up by clicking the link below:</p>
          <p>
            <a 
              href="https://bot.andaihub.com/ai-report" 
              style="color: #007bff; text-decoration: none;" 
              target="_blank">
              Sign Up at Andaihub
            </a>
          </p>
          <p>Additionally, here is the integration guide of your requested plugin:${title}</p>
          <p>
            <a 
              href="${docsURL}" 
              style="color: #007bff; text-decoration: none;" 
              target="_blank">
            Word File
            </a>
          </p>
          <p>Best regards,</p>
          <p>The Andaihub Team</p>
        </div>
      `,
  };
};

export async function POST(req) {
  try {
    const { name, email, title, docsURL } = await req.json();

    const mailOptions = setMailOptions(name, email, title, docsURL);

    const sendMailPromise = new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });

    await sendMailPromise;

    return NextResponse.json(
      {
        message: "Mail sent successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}

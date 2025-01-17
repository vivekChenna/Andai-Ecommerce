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
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Segoe UI', Arial, sans-serif;">
            <div style="max-width: 600px; margin: 40px auto; padding: 40px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <div style="text-align: center; margin-bottom: 30px;">
                <img 
                  src="https://firebasestorage.googleapis.com/v0/b/andai-admin-portal.appspot.com/o/images%2FnewAndai.jpg?alt=media&token=b92aa612-bf3a-4da5-a626-794649957d6c" 
                  alt="Andai Logo" 
                  style="width: 180px; height: auto;" 
                />
              </div>
              
              <div style="color: #333333; line-height: 1.6;">
                <p style="font-size: 16px; margin-bottom: 20px;">Hey <strong style="color: #2c3e50;">${name}</strong>,</p>
                
                <p style="font-size: 16px; margin-bottom: 25px;">Welcome to <strong style="color: #2c3e50;">Andaihub</strong>! We're thrilled to have you join our community.</p>
                
                <p style="font-size: 16px; margin-bottom: 15px;">To get started, please complete your registration:</p>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a 
                    href="https://bot.andaihub.com/ai-report" 
                    style="display: inline-block; padding: 12px 30px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: 500; transition: background-color 0.3s ease;" 
                    target="_blank">
                    Sign Up at Andaihub
                  </a>
                </div>
                
                <p style="font-size: 16px; margin-bottom: 15px;">We've also prepared the integration guide for your requested plugin: <strong style="color: #2c3e50;">${title}</strong></p>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a 
                    href="${docsURL}" 
                    style="display: inline-block; padding: 12px 30px; background-color: #28a745; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: 500; transition: background-color 0.3s ease;" 
                    target="_blank">
                    Integration Guide
                  </a>
                </div>
                
                <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
                  <p style="font-size: 16px; margin-bottom: 5px;">Best regards,</p>
                  <p style="font-size: 16px; font-weight: 500; color: #2c3e50;">The Andaihub Team</p>
                </div>
              </div>
            </div>
          </body>
          </html>
        `
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

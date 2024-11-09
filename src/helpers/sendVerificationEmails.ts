import { resend } from "@/lib/resend";
import nodemailer from "nodemailer"; 
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from '@/types/ApiResponse';

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    //  const result = await resend.emails.send({
    //   from: 'abhinav200513@gmail.com',
    //   to: email,
    //   subject: 'Stealthify | Verification Code',
    //   react: VerificationEmail({ username, otp: verifyCode }),
    // });

    const transport = nodemailer.createTransport({
      service: 'SendGrid', // For Mailgun, set 'host' and 'port' instead
      auth: {
        user: 'apikey', // for SendGrid, 'user' is 'apikey'
        pass: process.env.SENDGRID_API_KEY, // set this API key as an environment variable
      },
    });
    


    const receiver = {
      from : process.env.EMAIL_USER,
      to : email,
      subject : 'Stealthify | Verification Code',
      html :  `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verification Code</title>
        </head>
        <body style="font-family: Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>Hello, ${username}!</h2>
            <p>Your verification code for Stealthify is:</p>
            <h3 style="color: green;">${verifyCode}</h3>
            <p>Please enter this code on the website to verify your email.</p>
            <p>Thank you!</p>
          </div>
        </body>
      </html>
    ` ,
    }
    
    
    
    const result = await transport.sendMail(receiver, (error, info) => {
      if (error) {
        console.log(error);
        return { success: false, message: 'Failed to send verification email.' };
      }
      console.log('Email sent: ' + info);
      return { success: true, message: 'Verification email sent successfully.' };
    });


    console.log(result, " hiiiii")

    return { success: true, message: 'Verification email sent successfully.' };
    
  } catch (emailError) {
    console.error('Error sending verification email:', emailError);
    return { success: false, message: 'Failed to send verification email.' };
  }
}
import User from "@/models/user.model";
import nodemailer from "nodemailer"
import bcryptjs from "bcryptjs"
import { dbConnect } from "./dbConnect";

export const sendMail=async ({email,emailType,userId})=>
{
    try {
      await dbConnect();
      var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525, 
        auth: {
          user: process.env.NODE_MAILER_USER,
          pass: process.env.NODE_MAILER_PASS
        }
      });

        const hashedVerifyToken=  await bcryptjs.hash(userId.toString(),10)
          
          if(emailType=="VERIFY")
          {
            await User.findByIdAndUpdate(userId,{
              verifyToken:hashedVerifyToken,
              verifyTokenExpiry:Date.now()+3600000
            })
          }
          else if(emailType=="RESET PASSWORD")
          {
            await User.findByIdAndUpdate(userId,{
              forgotPasswordToken:hashedVerifyToken,
    forgotPasswordTokenExpiry:Date.now()+3600000,
            })
          }
          const info = await transport.sendMail({
            from: 'ansariiftekhar523@gmail.com', // sender address
            to: email,
            subject: emailType=="VERIFY"?"Verify your email":"Reset your password",
            html: `${emailType=="VERIFY"? 
              `
                  <p>
            Click <a href="${process.env.DOMAIN}/verify-account?token=${hashedVerifyToken}">here</a> to ${
              emailType=="VERIFY"?"Verify your email":"reset your email"
            }
            or copy and paste the link below in your browser
            </br>
            ${process.env.DOMAIN}/verify-account?token=${hashedVerifyToken}
            </p>
              `:
              `
                  <p>
            Click <a href="${process.env.DOMAIN}/reset-password?token=${hashedVerifyToken}&userid=${userId}">here</a> to ${
              emailType=="VERIFY"?"Verify your email":"reset your email"
            }
            or copy and paste the link below in your browser
            </br>
            ${process.env.DOMAIN}/reset-password?token=${hashedVerifyToken}
            &userid=${userId}</p>
              `
            }
        
            `
            
          });
          return info
        
    } catch (error) {
      
        throw new Error(error?.message)
    }
}
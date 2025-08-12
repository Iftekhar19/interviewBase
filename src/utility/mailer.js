import User from "@/models/user.model";
// import nodemailer from "nodemailer"
import bcryptjs from "bcryptjs"
import { dbConnect } from "./dbConnect";
import emailjs from "@emailjs/nodejs"

export const sendMail=async ({email,emailType,userId,req})=>
{
const host = req?.headers?.host || req?.headers?.['x-forwarded-host'];
const protocol = req?.headers?.['x-forwarded-proto'] || 'http';
const baseUrl = `${protocol}://${host}`;



    try {
      await dbConnect();
      // var transport = nodemailer.createTransport({
      //   host: "sandbox.smtp.mailtrap.io",
      //   port: 2525, 
      //   auth: {
      //     user: process.env.NODE_MAILER_USER,
      //     pass: process.env.NODE_MAILER_PASS
      //   }
      // });

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
          // const info = await transport.sendMail({
          //   from: 'ansariiftekhar523@gmail.com', // sender address
          //   to: email,
          //   subject: emailType=="VERIFY"?"Verify your email":"Reset your password",
          //   html: `${emailType=="VERIFY"? 
          //     `
          //         <p>
          //   Click <a href="${process.env.DOMAIN}/verify-account?token=${hashedVerifyToken}">here</a> to ${
          //     emailType=="VERIFY"?"Verify your email":"reset your email"
          //   }
          //   or copy and paste the link below in your browser
          //   </br>
          //   ${process.env.DOMAIN}/verify-account?token=${hashedVerifyToken}
          //   </p>
          //     `:
          //     `
          //         <p>
          //   Click <a href="${process.env.DOMAIN}/reset-password?token=${hashedVerifyToken}&userid=${userId}">here</a> to ${
          //     emailType=="VERIFY"?"Verify your email":"reset your email"
          //   }
          //   or copy and paste the link below in your browser
          //   </br>
          //   ${process.env.DOMAIN}/reset-password?token=${hashedVerifyToken}
          //   &userid=${userId}</p>
          //     `
          //   }
        
          //   `
            
          // });
          let info;
          if(emailType=="VERIFY")
          {
            // const link=`${window.location.protocol}//${window.location.host}/verify-account?token=${hashedVerifyToken}`
            const link=`${baseUrl.includes('undefined')?process.env.DOMAIN:baseUrl}/verify-account?token=${hashedVerifyToken}`
            info=await emailjs.send(process.env.EMAILJS_SERVICE_ID,process.env.EMAILJS_VA_TEMPLATE_ID,{
              email:email,
              link:link
            },{publicKey:process.env.EMAILJS_PUBLIC_KEY,privateKey:process.env.EMAILJS_PRIVATE_KEY})
          }
          if(emailType=="RESET PASSWORD")
          {
            // const link=`${window.location.protocol}//${window.location.host}/reset-password?token=${hashedVerifyToken}&userId=${userId}`
            const link=`${baseUrl.includes('undefined')?process.env.DOMAIN:baseUrl}/reset-password?token=${hashedVerifyToken}&userid=${userId}`
            info=await emailjs.send(process.env.EMAILJS_SERVICE_ID,process.env.EMAILJS_FP_TEMPLATE_ID,{
              email:email,
              link:link
            },{publicKey:process.env.EMAILJS_PUBLIC_KEY,privateKey:process.env.EMAILJS_PRIVATE_KEY})
          
          }
          return info
        
    } catch (error) {
      console.log(error.message)
        return new Error(error?.message)
    }
}
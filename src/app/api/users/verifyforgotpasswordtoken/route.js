import { dbConnect } from "@/utility/dbConnect";
import User from "@/models/user.model";
import { NextResponse } from "next/server";
// import bcryptjs from "bcryptjs"
// import { sendMail } from "@/helpers/mailer";


export async function POST(request)
{
try {
   await dbConnect()
    const reqBody=await request.json()
    const {token}=reqBody
    console.log(token)

    const user=await User.findOne({forgotPasswordToken:token,

        forgotPasswordTokenExpiry:{$gt:Date.now()}
    })
    // if token invalid or time expiry
    if(!user)
    {
        return NextResponse.json({
            success:false,
            message:"invalid token"
        },{status:400})
    }

    // user.isVerified=true
    user.forgotPasswordToken=undefined
    user.forgotPasswordTokenExpiry=undefined
    await user.save()
    return NextResponse.json({
        success:true,
        message:"token verification successfully"
    },{status:200})
} catch (error) {
    return NextResponse.json({
        success:false,
        message:error.message
    },{status:500})
}
}
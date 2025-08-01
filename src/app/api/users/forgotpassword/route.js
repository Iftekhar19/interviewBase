import User from "@/models/user.model";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import { dbConnect } from "@/utility/dbConnect";

export async function POST(req) {
    try {
      await  dbConnect()
     const {userid,password}  =await req.json()
     const user =await User.findById(userid)
     if(!user)
        {
            return NextResponse.json({
                success:false,
                message:"Invalid User"
            },{status:401})
        }
        const saltRound=Number(process.env.SALT_ROUND)
        const salt=await bcryptjs.genSalt(saltRound);
        const hashedPassword= await bcryptjs.hash(password,salt) 
        user.password=hashedPassword;
        await user.save()

        const response= NextResponse.json({
            message:"Password has been changed successfully",
            success:true
        },{status:201})
        response.cookies.delete("token")
        return response
    } catch (error) {
        console.log(error.message)
       return NextResponse.json({
        message:error.message,
        success:false
       },{status:400}) 
    }
}
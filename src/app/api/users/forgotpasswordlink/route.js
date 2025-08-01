import User from "@/models/user.model";
import { dbConnect } from "@/utility/dbConnect";
import { sendMail } from "@/utility/mailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    dbConnect();
    const { email } = await req.json();
    // console.log(email);
    const user = await User.findOne({ $or:[
      {email:email},
      {username:email}
    ] });
    // console.log(user); 
    if (!user) {
      return NextResponse.json(
        {
          message: "User not exist",
          success: false,
        },
        { status: 401 }
      );
    }
    await sendMail({
      email:user.email,
      emailType: "RESET PASSWORD",
      userId: user._id,
    });
    return NextResponse.json(
      {
        message: `Password reset link has been sent to the ${user.email} !`,
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error.message)
    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      { status: 501 }
    );
  }
}

import User from "@/models/user.model";
import { dbConnect } from "@/utility/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
   await dbConnect();
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);

    const user = await User.findOne({
      verifyToken: token,

      verifyTokenExpiry: { $gt: Date.now() },
    });
    // if token invalid or time expiry
    if (!user) {
      return NextResponse.json(
        {
          success:false,
          message: "invalid token",
        },
        { status: 400 }
      );
    }

    user.isVerified = true;
    user.verifyTokenExpiry = undefined;
    user.verifyToken = undefined;
    await user.save();
    return NextResponse.json(
      {
        success:true,
        message: "email verification successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success:false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

import User from "@/models/user.model";
import { dbConnect } from "@/utility/dbConnect";
import { extractDataFromToken } from "@/utility/extractDataFromToken";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
   await dbConnect();
    const userId = await extractDataFromToken(req);
    // console.log(userId);
    const user = await User.findOne({ _id: userId }).select("-password");
    // console.log(user);
    //  check if there is no user
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

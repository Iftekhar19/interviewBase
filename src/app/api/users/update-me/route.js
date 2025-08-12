import User from "@/models/user.model";
import { dbConnect } from "@/utility/dbConnect";
import { extractDataFromToken } from "@/utility/extractDataFromToken";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
   await dbConnect();
    const userId = await extractDataFromToken(req);
    // console.log(userId);

    const updatedData=await req.json()
   const res= await User.findByIdAndUpdate(userId,{
        ...updatedData
    },{new :true})

    return NextResponse.json(
      {
        success: true,
        message: res,
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

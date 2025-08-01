import User from "@/models/user.model";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
// import { sendMail } from "@/helpers/mailer";
import { dbConnect } from "@/utility/dbConnect";
import jwt from "jsonwebtoken";

export async function POST(req, res) {
  try {
   await dbConnect();
    const reqBody = await req.json();
    const { identifier, password } = reqBody;
    const user = await User.findOne({ $or:[
      {email:identifier},
      {username:identifier}
    ] });
    if (!user) {
      return NextResponse.json(
        {success:false, message: "User does not exist!" },
        { status: 400 }
      );
    }
    //    compare password
    const validPasssword = await bcryptjs.compare(password, user.password);
    if (!validPasssword) {
      return NextResponse.json(
        {success:false, message: "Check your credentials!" },
        { status: 400 }
      );
    }

    if (!user.isVerified) {
      return NextResponse.json(
        {
          success:false,
          message:
            "Your email verification is pending please check mail verify first",
        },
        { status: 401 }
      );
    }

    // creating jwt token
    const tokenData = {
      id: user._id,
      email: user.email,
      phone: user.phone,
    };

    let jwtToken = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "15d",
    });
    let response = NextResponse.json({
      message: "logged in success",
      // cookiesToken:jwtToken,
      success: true,
    },{status:201});
    response.cookies.set("token", jwtToken, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000,
      secure: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        success:false,
        message:error.message|| "unable to login",
      },
      { status: 401 }
    );
  }
}

import User from "@/models/user.model";
import { dbConnect } from "@/utility/dbConnect";
import { sendMail } from "@/utility/mailer";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {   // <-- FIXED signature
  try {
    await dbConnect();                 // <-- FIXED

    const reqBody = await request.json();
    const { email, password, phone, username } = reqBody;

    const user = await User.findOne({ email });

    // check if user already exists
    if (user) {
      // if user exists and verified
      if (user.isVerified) {
        return NextResponse.json(
          {
            success: false,
            message: "User already exists",
          },
          { status: 401 }
        );
      } else {
        // if user exists and not verified, update info and resend verification
        const saltRound = Number(process.env.SALT_ROUND) || 10;    // <-- FIXED
        const salt = await bcryptjs.genSalt(saltRound);
        const hashedPassword = await bcryptjs.hash(password, salt);

        user.username = username;
        user.phone = phone;
        user.password = hashedPassword;
        const savedUser = await user.save();

        // send verification email
        await sendMail({
          email,
          emailType: "VERIFY",
          userId: user._id,
        });

        return NextResponse.json(
          {
            success: true,
            message: "User updated, verification sent",
            user: {
              username: savedUser.username,
              email: savedUser.email,
              phone: savedUser.phone,
              id: savedUser._id,
            },
          },
          { status: 201 }
        );
      }
    } else {
      // if user does not exist, create new user
      const saltRound = Number(process.env.SALT_ROUND) || 10;           // <-- FIXED
      const salt = await bcryptjs.genSalt(saltRound);
      const hashedPassword = await bcryptjs.hash(password, salt);

      const newUser = new User({
        email,
        phone,
        password: hashedPassword,
        username,
      });
      const savedUser = await newUser.save();

      // send verification email
      await sendMail({
        email,
        emailType: "VERIFY",
        userId: savedUser._id,
      });

      return NextResponse.json(
        {
          message: "User registered successfully",
          success: true,
          user: {
            username: savedUser.username,
            email: savedUser.email,
            phone: savedUser.phone,
            id: savedUser._id,
          },
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 400,
      }
    );
  }
}

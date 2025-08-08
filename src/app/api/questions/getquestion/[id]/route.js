import { NextResponse } from "next/server";
import Question from "@/models/addquestion.model";
import { cookies } from "next/headers";
import { dbConnect } from "@/utility/dbConnect";
import { extractDataFromToken } from "@/utility/extractDataFromToken";


export async function GET(request,{params}) {
 
  // Get JWT from cookies
  const cookieStore =await cookies();
  const token = await cookieStore.get("token")?.value;
  if (!token) {
    return NextResponse.json(
      { message: "Not Authenticated", success: false },
      { status: 401 }
    );
  }

  // Decode JWT and get userId
  let userId;
  try {
    userId = extractDataFromToken(request);
    if (!userId) throw new Error("Invalid token");
    // Parse query parameters
    const {id}=await params
    await dbConnect();
    const ques=await Question.findById(id)
    if(!ques)
    {
      return NextResponse.json(
      { message: "No data to fetch", success: false },
      { status: 500 }
    );
    }
  
  

    return NextResponse.json(
      {
        success: true,
        message: ques
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Invalid Token", success: false },
      { status: 401 }
    );
  }
}

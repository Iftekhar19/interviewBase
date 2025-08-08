import { NextResponse } from "next/server";
import Question from "@/models/addquestion.model";
import { cookies } from "next/headers";
import { dbConnect } from "@/utility/dbConnect";
import { extractDataFromToken } from "@/utility/extractDataFromToken";

// Helper to fetch questions with pagination
async function fetchQuestions({ filter, skip, limit }) {
  const total = await Question.countDocuments(filter);
  const questions = await Question.find(filter).skip(skip).limit(limit).lean();
  return { questions, total };
}

export async function GET(request) {
  await dbConnect();
  // Get JWT from cookies
  const cookieStore =await cookies();
  const token =await cookieStore.get("token")?.value;
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
    const { searchParams } = new URL(request.url);
    const topic = searchParams.get("topic");
    const level = searchParams.get("level");
    const forWho = searchParams.get("for");
    const company = searchParams.get("company");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
    if (!topic) {
      return NextResponse.json(
        { message: "'topic' parameter is required", success: false },
        { status: 400 }
      );
    }

    // Build filter object for MongoDB
    const filter = { subject: topic };
    if (level.length>0) filter.level = level;
    if (forWho.length>0) filter.for = forWho;
    if (company.length>0) filter.askedIn = company;

    // Pagination calculations
    const skip = (page - 1) * pageSize;

    // Fetch from database
    const { questions, total } = await fetchQuestions({
      filter,
      skip,
      limit: pageSize,
    });

    return NextResponse.json(
      {
        success: true,
        message: {
          questions,
          total,
          page,
          pageSize,
          totalPages: Math.ceil(total / pageSize),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Unexpected error occured", success: false },
      { status: 401 }
    );
  }
}

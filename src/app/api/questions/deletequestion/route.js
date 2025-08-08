import Question from "@/models/addquestion.model";
import User from "@/models/user.model";
import { dbConnect } from "@/utility/dbConnect";
import { extractDataFromToken } from "@/utility/extractDataFromToken";
export async function DELETE(req) {
  if (req.method == "GET" || req.method == "POST") {
    return Response.json(
      {
        success: false,
        message: "method is not allowed",
      },
      { status: 500 }
    );
  }
  const { searchParams } = new URL(req.url);
  const subject = searchParams.get("subject");
  const questionId = searchParams.get("id");
  if (!subject || !questionId) {
    return Response.json(
      {
        success: false,
        message: "insuficient query paramters",
      },
      { status: 400 }
    );
  }
  await dbConnect();
  try {
    const userId = extractDataFromToken(req);
    if (!userId) {
      return Response.json(
        {
          success: false,
          message: "User not allowed",
        },
        { status: 401 }
      );
    }

    await Question.findByIdAndDelete(questionId);

    await User.findByIdAndUpdate(
      userId,
      {
        $inc: { [subject.toLowerCase()]: -1 },
      },
      { new: true }
    );

    return Response.json(
      {
        success: true,
        message: "question deleted successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log( error.message);
    return Response.json(
      {
        success: false,
        message: error?.message || "Unexpected error occured",
      },
      { status: 500 }
    );
  }
}

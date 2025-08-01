import User from "@/models/user.model";
import { dbConnect } from "@/utility/dbConnect";
export async function GET(request) {
    try {
     await dbConnect()
        const searchParams = request.nextUrl.searchParams;
        const username=searchParams.get("username")
        const res=await User.findOne({username,isVerified:true})
        if(res)
        {
            return Response.json({
            success:false,
            message:"Username already exist"
        },{status:400})
        }
         return Response.json({
            success:true,
            message:"Username is unique"
        },{status:200})
    } catch (error) {
        return Response.json({
            success:false,
            message:error.message
        },{status:500})
    }
}
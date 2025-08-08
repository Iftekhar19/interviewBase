import Question from "@/models/addquestion.model";
import User from "@/models/user.model";
import { dbConnect } from "@/utility/dbConnect";
import { extractDataFromToken } from "@/utility/extractDataFromToken";
export async function POST(req) {

  if(req.method=="GET") 
    {
        return Response.json({
            success:false,
            message:"method is not allowed"
        },{status:500})
    } 
    await dbConnect();
    const {title,askedIn,level,subject,for:forWhom,description} = await req.json();
    try {
        const userId=extractDataFromToken(req)
        if(!userId)
        {
             return Response.json({
            success:false,
            message:"User not allowed"
        },{status:401})
        }

        const newData= await Question.create({
           title,
           askedIn,
           level,
           for:forWhom,
           description:description.trim()||null ,
           userId,
           subject:subject

        })

        
        await User.findByIdAndUpdate(userId,{
            
            $inc:{[subject.toLowerCase()]:1}
          
        },{new:true})

        if(newData)
        {
            return Response.json({
                success:true,
                message:"question added successfully",
                data:newData
            },{
                status:200
            })
        }
        else{
             return Response.json({
            success:false,
            message:"Unable to add question"
        },{status:400})
        }

        
    } catch (error) {
        console.log("from route catch",error.message)
       return Response.json({
            success:false,
            message:error?.message||"Unexpected error occured"
        },{status:500})
    }
}
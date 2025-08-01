import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
export async function GET(req,res) {
    const token=req.cookies.get("token")?.value||""
    if(!token)
    {
        return NextResponse.json({
        error:"invalid token or session expired Please signin again",
        success:false
       },{status:401}) 
    }
  const decodedjwt=jwt.verify(token,process.env.TOKEN_SECRET)
  console.log(decodedjwt)
  return NextResponse.json({
    success:true,
    message:"valid token"
  },{status:200})
    
}

import { NextRequest,NextResponse } from "next/server";

export async function GET(req,res){
    try {

        let response=NextResponse.json({message:"logout successfully",success:true})
        response.cookies.set("token","",{httpOnly:true,expires:new Date(0)})
        return response
    } catch (error) {
        return NextResponse.json({
            message:"Unable to log out",
            success:false
        },{status:400})
    }
}
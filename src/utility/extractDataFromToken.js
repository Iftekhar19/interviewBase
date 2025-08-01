import jwt from "jsonwebtoken"
export const extractDataFromToken=(request)=>
{
    try {
      const token =request.cookies.get("token")?.value||""
      if(!token)
      {
        throw new Error("invalid token or please login then try to access this route")
      }
     const decodedToken= jwt.verify(token,process.env.TOKEN_SECRET)  

     return decodedToken.id
    } catch (error) {
        throw new Error(error.message)
    }
}
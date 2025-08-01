import mongoose from "mongoose";





const connection ={
isConnected:0
}
export async function dbConnect() {
    // console.log(connection.isConnected)
   if(connection.isConnected){
    console.log("Already connected to database")
    return
   }

   try {
    // console.log(process.env.NEXT_PUBLIC_MONGODB_URI)
   const db= await mongoose.connect(process.env.MONGO_URI,{
    
   })
 
  connection.isConnected= db.connections[0].readyState
  console.log("DB connect successfully")
    
   } catch (error) {
    console.log("Unexpected error",error)
    process.exit(1)
   }
}


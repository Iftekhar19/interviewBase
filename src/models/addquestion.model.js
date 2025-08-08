import mongoose from "mongoose";
const addQuestionSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please provide a title"],
        unique:[true,"same questions already exist!"]
    },
    askedIn:{
        type:String,
        required:[true,"Please provide a company name"],
        
    },
    subject:{
      type:String,
      required:[true,"subject is required"]
    },
    for:{
        type:String,
        required:[true,"Please provide a experience level"],
        
        
    },
    level:{
        type:String,
        required:[true,"plase select level"],
    },
    description:{
        type:String,
        default:null
        
    },
    userId:{
        type:mongoose.Types.ObjectId,
        required:[true,"userId is required"]
    },
    // timestamps: { createdAt: true, updatedAt: true }

})
const Question=mongoose.models.Question|| mongoose.model("Question",addQuestionSchema)
export default Question;
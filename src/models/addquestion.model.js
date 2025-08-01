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
    timestamps: { createdAt: true, updatedAt: true }

})
const Questions=mongoose.models.questions|| mongoose.model("questions",addQuestionSchema)
export default Questions;
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: [true, "Please provide a username"],
    unique: [true, "phone number already exist!"],
    
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    unique: [true, "Username should be unique!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: [true, "Email should be unique!"],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Please use valid email address"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;

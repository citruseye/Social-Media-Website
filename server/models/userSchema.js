import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        requied:true,
        unique:true 
    },
    email:{
        type:String,
        requied:true,
        unique:true
    },
    password:{
        type:String,
        requied:true 
    },
},{timestamps:true})
export const User = mongoose.model("User", userSchema);
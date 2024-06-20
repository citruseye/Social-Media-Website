import { User } from "../models/userSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const Register = async (req, res) =>{
    try {
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return res.status(401).json({
                message:"All fields are required.",
                success:false
            })
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(401).json({
                message:"User already exixt.",
                success:false
            })
        }

        const hashedPassword = await bcryptjs.hash(password, 16);

        await User.create({
            username,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            message:"Account created successfuly.",
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}
export const Login = async(req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(401).json({
                message:"All fields are required.",
                success:false
            })
        };
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message:"Incorrecr email or password.",
                success:false
            })
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({
                message:"Incorrect email or password.",
                success:false
            });
        }
        const tokenData = {
            userId:user._id
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn:"1d"});
        return res.status(201).cookie("token", token, {expiresIn:"1d", httpOnly:true}).json({
            message:`Welcome back ${user.username}`,
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
export const logout = (req, res) => {
    return res.cookie("token", "", { expiresIn: new Date(Date.now()) }).json({
        message: "user logged out successfully.",
        success: true
    })
}
export const getMyProfile = async(req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id).select("-password");
        return res.status(200).json({
            user,
        })
    } catch (error) {
        console.log(error);
    }
}
export const getOtherUsers = async (req,res) =>{ 
    try {
         const {id} = req.params;
         const otherUsers = await User.find({_id:{$ne:id}}).select("-password");
         if(!otherUsers){
            return res.status(401).json({
                message:"Currently do not have any users."
            })
         };
         return res.status(200).json({
            otherUsers
        })
    } catch (error) {
        console.log(error);
    }
}
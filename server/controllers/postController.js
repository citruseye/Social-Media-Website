import { response } from "express";
import { Post } from "../models/postSchema.js";
import { User } from "../models/userSchema.js";

export const createPost = async (req, res)=>{
    try {
        const {description, id} = req.body;
        if(!description || !id){
            response.status(401).json({
                message:"Fields are required",
                success:false
            });
        };
        const user = await User.findById(id).select("-password");
        await Post.create({
            description,
            userId:id,
            userDetails:user
        });
        return res.status(201).json({
            message:"Post created successfuly.",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const likeOrDislike = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if(post.like.includes(loggedInUserId)){
            // dislike
            await Post.findByIdAndUpdate(postId,{$pull:{like:loggedInUserId}});
            return res.status(200).json({
                message:"You disliked a post."
            })
        }else{
            // like
            await Post.findByIdAndUpdate(postId, {$push:{like:loggedInUserId}});
            return res.status(200).json({
                message:"You liked a post."
            })
        }
    } catch (error) {
        console.log(error);
    }
}
// export const getAllPosts = async (req, res) => {
//     // Only loggedInUser's posts
//     try {
//         const id = req.params.id;
//         const loggedInUserPosts = await Post.find({ userId: id });

//         return res.status(200).json({
//             posts: loggedInUserPosts,
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             message: "Internal server error",
//         });
//     }
// };
export const getAllPosts = async (req, res) => {
    try {
        const id = req.params.id;
        const loggedInUserPosts = await Post.find({ userId: id });
        const otherUsersPosts = await Post.find({ userId: { $ne: id } });
        
        return res.status(200).json({
            posts: loggedInUserPosts.concat(otherUsersPosts),
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            message: 'Something went wrong' });
    }
};
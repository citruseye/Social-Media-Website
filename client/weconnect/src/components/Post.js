import React from 'react';
import Avatar from 'react-avatar'
import axios from "axios";
import { POST_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import {useSelector,useDispatch} from "react-redux";
import {getRefresh} from "../redux/postSlice";

const Post = ({post}) => {
  const {user} = useSelector(store=>store.user)
  const dispatch = useDispatch();
  const LikeOrDislikeHandler = async (id) => {
    try {
      const res = await axios.put(`${POST_API_END_POINT}/like/${id}`,{id:user?._id}, {
        withCredentials:true
      })
      dispatch(getRefresh());
      toast.success(res.data.message)
      
    } catch (error) {
      toast.success(error.response.data.message)
      console.log(error);
    }
  }
  return (
    <main className="middle-content flex-grow p-6 pt-20 px-4">
      <div className="post-card mb-4 p-4 bg-white shadow-md rounded-lg">
        <div className="post-header flex items-center mb-2">
        <Avatar src="https://lh3.googleusercontent.com/a/ACg8ocKOjtKTBguQKUWJUIUyKtE6GlhIZ2dkZqK8kCIGu9PffveWTT_s=s324-c-no" size="40" round={true} />
          <h2 className="text-lg font-semibold">{post?.userDetails[0]?.username}</h2>
        </div>
        <p className="post-content mb-2">{post?.description}</p>
        <div className="post-actions flex justify-between mb-2">
          <div>
          <button onClick={()=>LikeOrDislikeHandler(post?._id)} className="like-button text-red-600">Like</button>
          <p>{post?.like?.length}</p>
          </div>
          <div>
          <button className="comment-button text-blue-600">Comments</button>
          <p>0</p>
          </div>
          
        </div>
        <div className="comments-section">
          
          
          <textarea
            className="w-full p-2 border rounded mb-2"
            placeholder="Write a comment..."
          />
          <button className="bg-gray-600 text-white py-2 px-4 rounded">Comment</button>
        </div>
      </div>
    </main>
  );
            
};

export default Post;
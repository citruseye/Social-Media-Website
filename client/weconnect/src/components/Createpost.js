import React, { useState } from 'react';
import axios from "axios";
import{POST_API_END_POINT} from "../utils/constant";
import toast from "react-hot-toast";
import {useSelector, useDispatch} from "react-redux";
import { getRefresh } from '../redux/postSlice';

const Createpost = () => {
  const [description, setDescription] = useState("");
  const {user} = useSelector(store=>store.user);
  const dispatch = useDispatch();

    const submitHandler = async () => {
      try {
        const res = await axios.post(`${POST_API_END_POINT}/create`, {description, id:user?._id}, {
          withCredentials:true,
        });
        dispatch(getRefresh());
        if(res.data.success){
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
  
  return (
    <div className="create-post mb-4 p-4 bg-white shadow-md rounded-lg px-4">
      <div className="create-post-header mb-2">
        <h2 className="text-lg font-semibold">Create Post</h2>
      </div>
      <input
      value={description}
      onChange={(e)=>setDescription(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        placeholder="What's on your mind?"
      />
      <button onClick={submitHandler} className="bg-blue-600 text-white py-2 px-4 rounded">Post</button>
    </div>
  );
};

export default Createpost;
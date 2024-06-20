import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import axios from "axios";
import { USER_API_END_POINT } from '../utils/constant';
import toast from "react-hot-toast";
import { getMyProfile, getOtherUsers, getUser } from '../redux/userSlice';

const Leftbar = () => {
  const {user} = useSelector(store=>store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
        const res = await axios.get(`${USER_API_END_POINT}/logout`);
        dispatch(getUser(null));
        dispatch(getOtherUsers(null));
        dispatch(getMyProfile(null));
        navigate('/login');
        toast.success(res.data.message);
    } catch (error) {
        console.log(error);
    }
}

  return (
    <aside className="left-bar bg-gray-100 h-screen fixed top-0 left-0 pt-16 w-64">
      <div className="mt-4">
        <Link to="/"><div className="sidebar-item py-2 px-4 hover:bg-gray-200">Home</div></Link>
        <Link to={`/profile/${user?._id}`} ><div className="sidebar-item py-2 px-4 hover:bg-gray-200">Profile</div></Link>
        <div className="sidebar-item py-2 px-4 hover:bg-gray-200">Messages</div>
        <div onClick={logoutHandler} className="sidebar-item py-2 px-4 hover:bg-gray-200 cursor-pointer">Logout</div>
      </div>
    </aside>
  );
};

export default Leftbar;
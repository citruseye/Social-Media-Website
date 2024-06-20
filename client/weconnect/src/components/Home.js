import React,{useEffect} from 'react';
import Leftbar from './Leftbar';
import Rightbar from './Rightbar';
import { Outlet, useNavigate } from 'react-router-dom';
import useOtherUsers from '../hooks/useOtherUsers'
import { useSelector } from 'react-redux';
import useGetMyPosts from '../hooks/useGetMyPosts';


const Home = () => {

  const {user, otherUsers} = useSelector(store=>store.user);
  const navigate = useNavigate();

  useEffect(()=>{
    if (!user) {
      navigate("/login");
    }
  },[]);

    //custom hooks
  useOtherUsers(user?._id);
  useGetMyPosts(user?._id);



  return (
    <div className="flex min-h-screen">
      <header className="navbar bg-blue-600 text-white fixed w-full z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-lg font-bold">WeConnect</h1>
        </div>
      </header>
      <Leftbar/>
      <div className="ml-64 flex-grow pt-20 px-4 mr-64">
        <Outlet/>
      </div>
      <Rightbar otherUsers={otherUsers}/>
    </div>
  );
};

export default Home;
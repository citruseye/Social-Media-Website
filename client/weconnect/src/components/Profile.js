import React from 'react'
import {Link, useParams} from 'react-router-dom'
import Avatar from 'react-avatar'
import { useSelector } from 'react-redux';
import useGetProfile from '../hooks/useGetProfile';

const Profile = () => {
  const {user, profile} = useSelector(store=>store.user);
  const {id} = useParams()
  useGetProfile(id);

    return (
        <div className="profile flex flex-col items-center p-6 bg-gray-100 min-h-screen">
          <Link to="/" className="w-full max-w-3xl mb-4 flex justify-between">
            <button className="bg-blue-600 text-white py-2 px-4 rounded">
              Back to Home
            </button>
            <div>
            {
  profile?._id === user?._id ? (
    <button className="bg-green-600 text-white py-2 px-4 rounded">Edit Profile</button>
  ) : (
    null
  )
}
              
            </div>
            
          </Link>
          <div className="profile-header w-full max-w-3xl p-6 bg-white shadow-md rounded-lg mb-4">
            <div className="flex items-center">
            <Avatar src="https://lh3.googleusercontent.com/a/ACg8ocKOjtKTBguQKUWJUIUyKtE6GlhIZ2dkZqK8kCIGu9PffveWTT_s=s324-c-no" size="70" round={true} />
              <div>
                <h2 className="text-2xl font-semibold">{profile?.username}</h2>
                <p className="text-gray-600">Location</p>
              </div>
            </div>
          </div>
          <div className="profile-info w-full max-w-3xl p-6 bg-white shadow-md rounded-lg mb-4">
            <h3 className="text-xl font-semibold mb-2">About</h3>
            <p className="text-gray-800 mb-2">Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p className="text-gray-800 mb-2">Joined: January 2020</p>
            <p className="text-gray-800">Website: <a href="https://example.com" className="text-blue-600">example.com</a></p>
          </div>
          
        </div>
      );
}

export default Profile
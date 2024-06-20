import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar'

const Rightbar = ({otherUsers}) => {
  return (
    <div className="right-bar fixed top-10 right-0 w-64 bg-gray-100 h-full p-4">
      <div className="user-profiles">
        <h2 className="text-xl font-semibold mb-4">Other Users</h2>
        {
          otherUsers?.map((user)=>{
            return(
              <div key={user?._id} className="flex items-center mb-4">
          <Avatar src="https://lh3.googleusercontent.com/a/ACg8ocKOjtKTBguQKUWJUIUyKtE6GlhIZ2dkZqK8kCIGu9PffveWTT_s=s324-c-no" size="40" round={true} />
          <div>
            <h3 className="text-md font-semibold">{user?.username}</h3>
            <Link to={`/profile/${user?._id}`}>
            <button className="text-blue-500 text-sm">View Profile</button>
            </Link>
          </div>
        </div>
            )
          })
        }
        
      </div>
    </div>
  );
};
  // return (
  //   <aside className="right-bar bg-gray-100 h-screen fixed top-0 right-0 pt-16 w-64 px-4">
  //     <div className="mt-4">
  //       <div className="search-bar mb-4">
  //         <input 
  //           type="text" 
  //           className="w-full p-2 border rounded" 
  //           placeholder="Search..."
  //         />
  //       </div>
  //       <div className="sidebar-item py-2 px-4 hover:bg-gray-200">Friends</div>
  //       <div className="sidebar-item py-2 px-4 hover:bg-gray-200">Groups</div>
  //       <div className="sidebar-item py-2 px-4 hover:bg-gray-200">Events</div>
  //       <div className="sidebar-item py-2 px-4 hover:bg-gray-200">Marketplace</div>
  //     </div>
  //   </aside>
  // );

export default Rightbar;
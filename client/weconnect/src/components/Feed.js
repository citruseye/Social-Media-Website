import React from 'react';
import Createpost from './Createpost';
import Post from './Post';
import { useSelector } from 'react-redux';

const Feed = () => {
  const {posts} = useSelector(store=>store.post);
  return (
    <div className="feed flex-grow p-6 pt-20 px-4">
      <Createpost/>
      {
        posts?.map((post)=> <Post key={post?._id} post={post}/>)
      }

    </div>
  );
            
};

export default Feed;
// import React, { useContext } from "react";
// import { AppContext } from "../../context/userContext";
import Post from "../Post/Post";
import "./homepage.css";
export default function Homepage() {
  // const context = useContext(AppContext);
  // console.log(context);
  return (
    <div className='homepage'>
      <div className='feedType'>
        <div className='feedOption'>Global feed </div>
        <div className='feedOption'>Your feed</div>
      </div>
      <div className='feed'>
        {/* example post */}
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
}

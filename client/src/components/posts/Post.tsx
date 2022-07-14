import React from "react";
import "./post.css";
export default function Post() {
  return (
    <div className='post'>
      <div className='userInfo'>
        <div className='userImage'> </div>
        <div>
          <div className='userName'>Username</div>
          <div>08/07/2022</div>
        </div>
      </div>
      <div className='postDescription'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi unde
        cum atque ipsum magnam, praesentium consequatur, natus laboriosam cumque
        quidem esse earum fugit tempora iure dolor adipisci nam officiis sed.
      </div>
      <div className='postReadMore'>
        <div>Read More...</div>
        <div>JS React Tech</div>
      </div>
    </div>
  );
}

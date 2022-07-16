import React, { useState } from "react";
import { myApi } from "../../api/api";
import "./comment.css";
export default function Comment(comment: any) {
  const [userName, setUserName] = useState("");
  const [profile, setProfile] = useState("");
  const getUserInfo = async () => {
    const res = await myApi.get(`/user/${comment.userID}`);

    setUserName(res.data.userName);
    setProfile(res.data.image);
  };
  getUserInfo();
  return (
    <div className='comment'>
      <div className='commentText'>{comment.text}</div>
      <div className='comment-user'>
        <div className='comment-picture'>
          <img src={profile} alt='' />
        </div>
        <div className='profile'>
          {/* //todo link to userNAME*/}
          <div className='profile-user'> {userName} </div>
        </div>
        <div className='profile-date'>{comment.createdAt}</div>
      </div>
    </div>
  );
}

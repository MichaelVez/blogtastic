import React, { useState } from "react";
import { Link } from "react-router-dom";
import { myApi } from "../../api/api";
import "./post.css";
export default function Post(props: any) {
  let [userName, setUserName] = useState("");
  let [profileImg, setProfileImg] = useState("");
  let fixedDate =
    props.createdAt.slice(8, 10) +
    "/" +
    props.createdAt.slice(5, 7) +
    "/" +
    props.createdAt.slice(0, 4) +
    " - " +
    props.createdAt.slice(11, 16);
  const getUserInfo = async () => {
    const res = await myApi.get(`/user/${props.author}`);
    setProfileImg(res.data.image);
    setUserName(res.data.userName);
  };
  getUserInfo();
  return (
    <div className='post'>
      <div className='userInfo'>
        <div className='userImage'>
          <img src={profileImg} alt='' className='postProfileImg' />
        </div>
        <div>
          <div className='userName'>
            By: {userName}, {fixedDate}
          </div>
        </div>
      </div>
      <h2>{props.title}</h2>
      <h4 className='postDescription'>{props.headline}</h4>
      <div className='postReadMore'>
        <div>
          <Link to={`/blog/${props._id}`}>//todo Read More... Route</Link>
        </div>
        <div>TAGSS</div>
      </div>
    </div>
  );
}

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { myApi } from "../../api/api";
import { AppContext } from "../../context/userContext";
import "./post.css";
export default function Post(props: any) {
  let context = useContext(AppContext);
  console.log(context);

  let [userName, setUserName] = useState("");
  let [profileImg, setProfileImg] = useState("");
  let [likes, setLikes] = useState(props.likes);
  let [isLike, setIsLike] = useState(false);
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
    // setLikes(res.data.likes);
    setProfileImg(res.data.image);
    setUserName(res.data.userName);
  };
  const likeFunc = async () => {
    try {
      if (!isLike) {
        setIsLike((prev) => !prev);
        setLikes((prev: any) => prev + 1);
        let res = await myApi.post("/blog/like", {
          blogId: props._id,
          number: likes + 1,
        });
        console.log(res);
      } else {
        setIsLike((prev) => !prev);
        setLikes((prev: any) => prev - 1);
        let res = await myApi.post("/blog/like", {
          blogId: props._id,
          number: likes - 1,
        });
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
    //add to fave userstate
  };
  getUserInfo();
  return (
    <div className='post'>
      <div className='userInfo'>
        <div className='userInfoCont'>
          <div className='userImage'>
            <img src={profileImg} alt='' className='postProfileImg' />
          </div>
          <div>
            <div className='userName'>
              By: {userName}, {fixedDate}
            </div>
          </div>
        </div>
        <div className={`likes ${isLike ? "red" : ""}`} onClick={likeFunc}>
          <span className='material-symbols-outlined'>heart_plus</span>
          {likes}
        </div>
      </div>
      <h1>{props.title}</h1>
      <h4 className='postDescription'>{props.headline}</h4>
      <div className='postReadMore'>
        <div>
          <Link to={`/blog/${props._id}`} className='postBTN'>
            {" "}
            Open article...
          </Link>
        </div>
        <div>TAGSS</div>
      </div>
    </div>
  );
}

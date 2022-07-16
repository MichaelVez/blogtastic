import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { myApi } from "../../api/api";
import Spinner from "../spinner/Spinner";
import "./readPost.css";
export default function ReadPost() {
  const params = useParams();
  //   console.log(params);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  //   const [blog, setBlog] = useState();
  const [title, setTitle] = useState("");
  const [headline, setHeadlineState] = useState("");
  const [content, setContent] = useState("");
  let [userName, setUserName] = useState("");
  let [profileImg, setProfileImg] = useState("");
  useEffect(() => {
    try {
      const getBlog = async () => {
        const res = await myApi.get(`/blog/read/${params._id}`);
        console.log(res.data[0]);
        const blogRes = res.data[0];
        setTitle(blogRes.title);
        setHeadlineState(blogRes.headline);
        setContent(blogRes.content);
        getUserInfo(blogRes.author);
      };
      getBlog();
      const getUserInfo = async (author: string) => {
        const res = await myApi.get(`/user/${author}`);
        setProfileImg(res.data.image);
        setUserName(res.data.userName);
      };
    } catch (err: any) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);
  if (loading) return <Spinner />;
  if (error) return <>{error}</>;
  return (
    <div className='readPost'>
      <div className='post-head'>
        <h1 className='postTitle'>{title}</h1>
        <div>created by: {userName}</div>
        <h2 className='postHeadline'>{headline}</h2>
      </div>
      <div
        className='blog_preview'
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div>Comments</div>
    </div>
  );
}

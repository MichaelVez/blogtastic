import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { myApi } from "../../api/api";
import { AppContext } from "../../context/userContext";
import Comment from "../comment/Comment";
import Spinner from "../spinner/Spinner";
import "./readPost.css";
export default function ReadPost() {
  const params = useParams();
  const context = useContext(AppContext);
  //   console.log(params);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  //   const [blog, setBlog] = useState();
  const [title, setTitle] = useState("");
  const [headline, setHeadlineState] = useState("");
  const [content, setContent] = useState("");
  const [userName, setUserName] = useState("");
  const [postId, setPostId] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [commentInputState, setCommentInputState] = useState("");
  const [comments, setComments] = useState(
    "No comments here yet... Be the first to comment!"
  );
  const postComment = async () => {
    console.log(commentInputState);
    const result = await myApi.post("/blog/comment", {
      commentInputState,
      userID: context.userState?._id,
      postID: postId,
    });
    console.log(result);
    buildComments(result.data.comments);
  };
  const buildComments = (commentsArray: any) => {
    setComments(
      commentsArray.reverse().map((comment: any) => {
        return <Comment {...comment} />;
      })
    );
  };
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
        setPostId(blogRes._id);
        console.log(blogRes);
        if (blogRes.comments.length > 0) {
          buildComments(blogRes.comments);
        }
      };
      const getUserInfo = async (author: string) => {
        const res = await myApi.get(`/user/${author}`);
        setProfileImg(res.data.image);
        setUserName(res.data.userName);
      };

      getBlog();
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
    <>
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
      </div>
      <div className='commentBoxCont'>
        <div className='commentBox'>
          <div className='commentInputCont'>
            <textarea
              placeholder='Write a comment'
              className='commentInput'
              value={commentInputState}
              onChange={(e: any) => setCommentInputState(e.target.value)}
            />
          </div>
          <button className='commentBtn' onClick={postComment}>
            Post
          </button>
        </div>
        <div className='comments'>{comments}</div>
      </div>
    </>
  );
}

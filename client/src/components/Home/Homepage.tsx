// import React, { useContext } from "react";
// import { AppContext } from "../../context/userContext";
import { useEffect, useState } from "react";
import { myApi } from "../../api/api";
import Post from "../posts/Post";
import Spinner from "../spinner/Spinner";
import "./homepage.css";
export default function Homepage() {
  // const context = useContext(AppContext);
  // console.log(context);
  const [postState, setPostState] = useState();
  const [loading, setLoading] = useState<Boolean>(true);
  useEffect(() => {
    const getData = async () => {
      const res = await myApi.get("/blog");
      res.data.blogs.reverse();
      console.log(res.data.blogs);
      setPostState(
        res.data.blogs.map((post: any) => {
          return <Post {...post} key={post.title} />;
        })
      );
      setLoading(false);
    };
    getData();
  }, []);
  if (loading) return <Spinner />;
  return (
    <div className='homepage'>
      <div className='feedType'>
        <div className='feedOption'>Global feed </div>
        <div className='feedOption'>Your feed</div>
      </div>
      <div className='feed'>
        {/* example post */}
        {postState}
        {/* <Post /> */}
      </div>
    </div>
  );
}

import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { myApi } from "../../api/api";
import { AppContext } from "../../context/userContext";
import Post from "../posts/Post";
import "./profile.css";

export const Profile = () => {
  const [showingArticles, setShowingArticles] = useState("");
  const navigate = useNavigate();
  const context = useContext(AppContext);
  console.log(context);
  const getUsersArticles = async () => {
    try {
      const result = await myApi.post("/blog/filterByUserId", {
        userId: context.userState?._id,
      });
      console.log(result.data);
      setShowingArticles(
        result.data.map((article: any) => {
          console.log(article);
          return <Post {...article} key={article._id} />;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (!context.userState?.userName) {
      navigate("/");
    }
    getUsersArticles();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <div className='profile-top'>
        <div className='image-preview'>
          <img src={context.userState?.image} alt='' />
        </div>
        <h3 className='profile-name'>{context.userState?.userName}</h3>
        <p>
          {context.userState?.bio
            ? context.userState?.bio
            : "Update your Bio for people to know you!"}
        </p>
        <div className='profile-settings'>
          <Link to='/settings'>Change my settings</Link>
        </div>
      </div>
      <div className='profile-articles'>
        <div className='profile-options'>
          <div>My articles</div>
          <div>Saved articles</div>
        </div>
        <div>
          {showingArticles === "" ? (
            "nothing here yet..."
          ) : (
            <div>{showingArticles}</div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/userContext";
import "./profile.css";

export const Profile = () => {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  console.log(context);
  useEffect(() => {
    if (!context.userState?.userName) {
      navigate("/");
    }

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
        <div>nothing here yet...</div>
      </div>
    </div>
  );
};

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/userContext";
import "./profile.css";

export const Profile = () => {
  const context = useContext(AppContext);
  console.log(context);

  return (
    <div>
      <div className='profile-top'>
        <div className='image-preview'>
          <img src={context.userState?.img} alt='' />
        </div>
        <h3 className='profile-name'>{context.userState?.userName}</h3>
        <p>//todo bio todo</p>
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

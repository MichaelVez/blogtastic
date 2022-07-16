import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/userContext";
import "./navbar.css";
export default function Navbar() {
  const context = useContext(AppContext);

  return (
    <div className='navbar'>
      <Link to='/' className='logo'>
        blogTastic
      </Link>
      {context.token?.token === "1" ? (
        <>
          <div className='right-nav'>
            <Link to='/login' className='login'>
              Login
            </Link>
            <Link to='/register' className='register'>
              Sign up
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className='right-nav'>
            <Link to='/new-article' property='test'>
              <span className='material-symbols-outlined'>open_in_new</span>
              New Article
            </Link>
            <Link to='/profile'>{context.userState?.userName}</Link>
            <Link to='/settings'>
              <span className='material-symbols-outlined'>settings</span>
              Settings
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

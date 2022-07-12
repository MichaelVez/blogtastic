import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/userContext";
import "./navbar.css";
export default function Navbar() {
  const context = useContext(AppContext);

  return (
    <div className='navbar'>
      <Link to='/'>Home</Link>
      {context.token?.token === "1" ? (
        <>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Sign up</Link>
        </>
      ) : (
        <>
          <Link to='/new-article'>New Article</Link>
          <Link to='/profile'>{context.userState?.userName}</Link>
          <Link to='/settings'>Settings</Link>
        </>
      )}
    </div>
  );
}

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/userContext";
import "./navbar.css";
export default function Navbar() {
  const context = useContext(AppContext);
  console.log(context);

  return (
    <div className='navbar'>
      <Link to='/'>Home</Link>
      {context.token?.token === "1" ? (
        <>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Sign up</Link>
          {console.log("first if")}
          {console.log(context.token)}
        </>
      ) : (
        <>
          <Link to='/user'>{context.userState?.userName}</Link>
        </>
      )}
    </div>
  );
}

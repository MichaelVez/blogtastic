import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
export default function Navbar() {
  return (
    <div className='navbar'>
      <div>
        <Link to='/'>
          <span className='material-icons'>home</span>
        </Link>
      </div>
      <div>
        <Link
          to='/studio'
        >
          <span className='material-icons'>play_circle</span>
        </Link>
      </div>
      <div>
        <span className='material-icons'>public</span>
      </div>
    </div>
  );
}

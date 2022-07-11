import React from "react";
import { Link } from "react-router-dom";
import "./login.css";
export default function Login() {
  const handleChange = () => {};
  const handleClick = () => {};

  return (
    <>
      <form className='login-form' action=''>
        <div className='form-inputs'>
          <input
            onChange={handleChange}
            placeholder={"Email"}
            name='email'
            // value={formLogin.email}
            type='email'
            required
          />

          <input
            onChange={handleChange}
            placeholder={"password"}
            name='password'
            autoComplete='true'
            // password={formLogin.password}
            type='password'
            required
          />
        </div>

        <button onClick={handleClick} type='submit'>
          Login
        </button>
      </form>
      <div className='login-new'>
        First time?{" "}
        <Link className='page-link' to='/register'>
          click here to create a new account
        </Link>
      </div>
    </>
  );
}

import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createNewUser } from "../../api/api.js";
import { AppContext } from "../../context/userContext";
import Spinner from "../spinner/Spinner.jsx";
import "./register.css";
interface IInput {
  userName: string;
  email: string;
  password: string;
  password2: string;
}

export default function Register() {
  const [spinnerState, setSpinnerState] = useState(false);
  const [formError, setFormError] = useState<string | boolean>(false);
  const [inputState, setInputState] = useState<IInput>({
    userName: "",
    email: "",
    password: "",
    password2: "",
  });
  const navigate = useNavigate();
  const context = useContext(AppContext);
  console.log(inputState);

  const handleChange = (e: any) => {
    setInputState({ ...inputState, [e.target.name]: e.target.value });
  };
  const handleClick = async (e: any) => {
    e.preventDefault();
    const { userName, email, password, password2 } = inputState;
    //!check user input start
    if (userName.length < 4) {
      return setFormError("User name must be at least 4 characters");
    }
    if (userName.length > 50) {
      return setFormError("User name too long");
    }
    if (!email) return setFormError("Please enter all fields");
    if (!validateEmail(email))
      return setFormError("Please enter a valid email");
    if (password !== password2) {
      return setFormError("Passwords do not match");
    }
    //!check user input end
    setSpinnerState(true);
    const userCreated = await createNewUser(inputState);
    setSpinnerState(false);
    if (userCreated.response && userCreated.response.status === 400) {
      return setFormError(
        userCreated.response.statusText + " Email / User exists"
      );
    }
    const filteredUser = {
      userName: userCreated.user.userName,
      email: userCreated.user.email,
      _id: userCreated.user._id,
      tokens: userCreated.user.tokens,
      image: "./default-avatar.png",
    };
    //set context
    context.setToken?.(userCreated.token);
    context.setUser?.(filteredUser);
    localStorage.setItem("token", userCreated.token);
    localStorage.setItem("user", JSON.stringify(filteredUser));
    navigate("/");
  };

  return (
    <>
      {spinnerState ? (
        <Spinner />
      ) : (
        <>
          <form className='register-form' action=''>
            <div className='form-inputs'>
              <input
                onChange={handleChange}
                placeholder={"Choose your User name"}
                name='userName'
                value={inputState.userName}
                type='text'
                required
              />

              <input
                onChange={handleChange}
                placeholder={"Email"}
                name='email'
                value={inputState.email}
                type='email'
                required
              />

              <input
                onChange={handleChange}
                placeholder={"Password"}
                name='password'
                autoComplete='true'
                value={inputState.password}
                type='password'
                required
              />
              <input
                onChange={handleChange}
                placeholder={"Confirm Password"}
                name='password2'
                autoComplete='true'
                value={inputState.password2}
                type='password'
                required
              />
            </div>
            <h4 className='formError'>{formError}</h4>
            <button onClick={handleClick} type='submit'>
              {"Create new account"}
            </button>
          </form>
          <div className='login-new'>
            Already have and account?
            <Link className='page-link' to='/login'>
              Sign in
            </Link>
          </div>
        </>
      )}
    </>
  );
}
export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

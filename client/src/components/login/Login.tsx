import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/api";
import { AppContext } from "../../context/userContext";
import Spinner from "../spinner/Spinner";
import "./login.css";
interface IInput {
  email: string;
  password: string;
}
export default function Login() {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const [inputState, setInputState] = useState<IInput>({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState<string | boolean>(false);
  const [spinnerState, setSpinnerState] = useState(false);
  const handleChange = (e: any) => {
    setInputState({ ...inputState, [e.target.name]: e.target.value });
  };
  const handleClick = async (e: any) => {
    e.preventDefault();
    if (!inputState.email || !inputState.password)
      return setFormError("Please enter all fields");
    setSpinnerState(true);
    const userLogin = await loginUser(inputState);
    setSpinnerState(false);
    if (userLogin.error) return setFormError(userLogin.error);
    const filteredUser = {
      userName: userLogin.user.userName,
      email: userLogin.user.email,
      _id: userLogin.user._id,
      tokens: userLogin.user.tokens,
      image: userLogin.user.image || "./default-avatar.png",
    };
    context.setToken?.(userLogin.token);
    context.setUser?.(filteredUser);
    localStorage.setItem("token", userLogin.token);
    localStorage.setItem("user", JSON.stringify(filteredUser));
    // setUserSignIn(userLogin.user);
    // localStorage.setItem("token", userToken);
    // localStorage.setItem("user", JSON.stringify(userLogin.user));
    navigate("/");
  };

  return (
    <>
      {spinnerState ? (
        <Spinner />
      ) : (
        <>
          <h4 className='formError'>{formError}</h4>
          <form className='login-form' action=''>
            <div className='form-inputs'>
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
                placeholder={"password"}
                name='password'
                autoComplete='true'
                value={inputState.password}
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
      )}
    </>
  );
}

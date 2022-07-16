// import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Home/Homepage";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/userContext";
import { Profile } from "./components/profile/Profile";
import Settings from "./components/settings/Settings";

import NewPost from "./components/newPost/NewPost";
import ReadPost from "./components/readPost/ReadPost";
import { myApi } from "./api/api";

function App() {
  const context = useContext(AppContext);

  useEffect(() => {
    //using local storage to set context
    const tokenLocalStorage = localStorage.getItem("token");
    const userSignInLocalStorage = localStorage.getItem("user");
    if (tokenLocalStorage && userSignInLocalStorage) {
      context.setToken?.({ token: tokenLocalStorage });
      context.setUser?.(JSON.parse(userSignInLocalStorage));
    }
    // const res = myApi.get(`/user/${context.userState?._id}`);
    // getUserWithId(context.userState?._id);
    // eslint-disable-next-line
  }, []);
  console.log(context);

  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/new-article' element={<NewPost />} />
        <Route path='/new-article/:_id' element={<NewPost />} />
        <Route path='/blog/:_id' element={<ReadPost />} />
      </Routes>
    </div>
  );
}

export default App;

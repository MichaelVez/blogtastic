import React, { useContext, useEffect } from "react";
import Homepage from "./components/Home/Homepage";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { Profile } from "./components/profile/Profile";
import Settings from "./components/settings/Settings";

import NewPost from "./components/newPost/NewPost";
import ReadPost from "./components/readPost/ReadPost";
import { Route, Routes, useLocation } from "react-router-dom";
import { AppContext } from "./context/userContext";
import { AnimatePresence } from "framer-motion";
export default function AnimatedRoutes() {
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
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/new-article' element={<NewPost />} />
        <Route path='/new-article/:_id' element={<NewPost />} />
        <Route path='/blog/:_id' element={<ReadPost />} />
      </Routes>
    </AnimatePresence>
  );
}

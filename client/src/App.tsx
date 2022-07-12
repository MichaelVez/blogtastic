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

function App() {
  const context = useContext(AppContext);

  useEffect(() => {
    //using local storage to set context
    const tokenLocalStorage = localStorage.getItem("token");
    const userSignInLocalStorage = localStorage.getItem("user");
    if (tokenLocalStorage && userSignInLocalStorage) {
      context.setToken?.({ token: tokenLocalStorage });
      context.setUser?.(JSON.parse(userSignInLocalStorage));
      console.log(context);
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/settings' element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;

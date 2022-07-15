import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/userContext";

export default function NewPost() {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  useEffect(() => {
    if (!context.userState?.userName) {
      navigate("/");
    }

    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <form action=''>
        <input type='text' placeholder='Article Title' />
        <input type='text' placeholder='' />
        <input type='text' />
        <input type='text' />
      </form>
    </div>
  );
}

import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../api/api";
import { AppContext } from "../../context/userContext";
import { validateEmail } from "../register/Register";
import Spinner from "../spinner/Spinner";

import "./settings.css";
interface IInput {
  userName: string | undefined;
  email: string | undefined;
  password: string | undefined;
  image: string | undefined;
  _id: string | undefined;
  bio: string | undefined;
}
export default function Settings() {
  const [spinnerState, setSpinnerState] = useState(false);
  const context = useContext(AppContext);
  const [formError, setFormError] = useState<string | boolean>(false);
  const [inputState, setInputState] = useState<IInput>({
    userName: context.userState?.userName,
    email: context.userState?.email,
    password: "",
    image: "",
    _id: context.userState?._id,
    bio: context.userState?.bio,
  });
  //   todo onlick update
  const handleClick = async (e: any) => {
    e.preventDefault();
    //!verify input
    if (inputState.password!.length !== 0) {
      if (inputState.password!.length < 4) {
        return setFormError("password is too short");
      }
      if (inputState.password!.length > 50) {
        return setFormError("password is too long");
      }
    }
    if (!validateEmail(inputState.email!)) {
      return setFormError("invalid email");
    }
    if (inputState.userName!.length < 4) {
      return setFormError("User name must be at least 4 characters");
    }
    if (inputState.userName!.length > 50) {
      return setFormError("User name too long");
    }
    //? end verify input
    setSpinnerState(true);
    const res = await updateUser(inputState);
    setSpinnerState(false);
    if (res.response && res.response.status !== 201) {
      //in case file is too big
      if (typeof res.response.data === "string")
        return setFormError(res.response.data);
      else {
        console.log(res);
        return;
      }
    }
    res.image = res.image.replace("server\\", "");
    context.setUser?.(res);
    localStorage.setItem("user", JSON.stringify(res));
    navigate("/profile");
  };

  //?state management
  const onChange = (e: any) => {
    setInputState({ ...inputState, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!context.userState?.userName) {
      navigate("/");
    }
    console.log(inputState);

    // eslint-disable-next-line
  }, []);
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl]: any = useState(context.userState?.image);
  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const fileUploadClick = async (e: any) => {
    fileUploadRef.current?.click();
  };
  const onChangeFile = (e: any) => {
    if (e.target.files && e.target.files.length === 1) {
      setInputState({ ...inputState, [e.target.name]: e.target.files[0] });
      setFile(e.target.files[0]);
    }
  };
  return (
    <>
      {spinnerState ? (
        <Spinner />
      ) : (
        <div className='settings-cont'>
          <form action=''>
            <div className='settings'>
              <div className='image-preview'>
                {previewUrl && <img src={previewUrl} alt='' />}
                {/* {!previewUrl && <div>upload a file or set and image</div>} */}
              </div>
              {/* //*username  */}
              <input
                type='text'
                placeholder='Your user name'
                name='userName'
                value={inputState.userName}
                onChange={onChange}
              />
              {/* //*email */}
              <input
                type='text'
                placeholder='Your email'
                name='email'
                value={inputState.email}
                onChange={onChange}
              />
              {/* //* password */}
              <input
                type='password'
                placeholder='New password'
                name='password'
                value={inputState.password}
                onChange={onChange}
              />
              {/* //!todo BIO */}
              <textarea
                name='bio'
                placeholder='Update Bio'
                id='bio'
                value={inputState.bio}
                cols={20}
                rows={5}
                onChange={onChange}
              ></textarea>
              {/* //!todo BIO */}
              {/* //*img url */}

              <div onClick={fileUploadClick} className='fileUploadBtn'>
                Upload image
              </div>

              <h4 className='formError'>{formError}</h4>
              {/* //!invis input */}
              <input
                type='file'
                id='image'
                name='image'
                onChange={onChangeFile}
                style={{ display: "none" }}
                ref={fileUploadRef}
                accept={".jpg,.png,.jpeg"}
              />
              {/* // value={undefined} */}
              {/* //!submit */}
              <button onClick={handleClick} type='submit'>
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

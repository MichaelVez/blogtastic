import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../api/api";
import { AppContext } from "../../context/userContext";
import "./settings.css";
interface IInput {
  userName: string | undefined;
  email: string | undefined;
  password: string | undefined;
  img: string | undefined;
}
export default function Settings() {
  const context = useContext(AppContext);
  //   const [spinnerState, setSpinnerState] = useState(false);
  const [formError, setFormError] = useState<string | boolean>(false);
  const [inputState, setInputState] = useState<IInput>({
    userName: context.userState?.userName,
    email: context.userState?.email,
    password: "",
    img: "",
  });
  //   todo onlick update
  const handleClick = async (e: any) => {
    e.preventDefault();
    //elokim ishmor oti man (:
    console.log(inputState);
    const bodyReq = {
      ...inputState,
      id: context.userState?._id,
    };
    updateUser(bodyReq);
  };
  //?state management
  const onChange = (e: any) => {
    console.log(inputState);
    console.log("here");

    setInputState({ ...inputState, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (!context.userState?.userName) {
      navigate("/");
    }
  }, []);
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl]: any = useState(context.userState?.img);
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
    setInputState({ ...inputState, [e.target.name]: e.target.files[0] });
    if (e.target.files && e.target.files.length === 1) {
      setFile(e.target.files[0]);
    }
  };
  return (
    <div>
      <form action=''>
        <div className='settings'>
          <div className='image-preview'>
            {previewUrl && <img src={previewUrl} alt='select and image' />}
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
            type='text'
            placeholder='New password'
            name='password'
            value={inputState.password}
            onChange={onChange}
          />
          {/* //!todo BIO */}
          <textarea
            name=''
            placeholder='Bio'
            id='bio'
            cols={20}
            rows={5}
            // onChange={onChange}
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
            id='file'
            name='img'
            onChange={onChangeFile}
            style={{ display: "none" }}
            ref={fileUploadRef}
            value={undefined}
            accept={".jpg,.png,.jpeg"}
          />
          {/* //!submit */}
          <button onClick={handleClick} type='submit'>
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

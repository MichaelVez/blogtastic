import React, { useContext, useEffect, useState } from "react";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/userContext";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./newPost.css";
import Spinner from "../spinner/Spinner";
import { myApi } from "../../api/api";
export default function NewPost(props: any) {
  const navigate = useNavigate();
  const context = useContext(AppContext);

  let [titleState, setTitleState] = useState<string>("");
  let [headlineState, setHeadlineState] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [_id, setId] = useState<string>("");
  // const [picture, setPicture] = useState<string>("");
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const [saving, setSaving] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  const params = useParams();
  useEffect(() => {
    let blogID = params._id;
    // check if edit or new blog
    if (blogID) {
      setId(blogID);
      getBlog(blogID);
    } else {
      setLoading(false);
    }

    // eslint-disable-next-line
  }, []);

  const getBlog = async (id: string) => {
    try {
      //7:30 watch video and trry code after building input
      const res = await myApi.get(`/blog/read/${id}`);
      console.log(res);
      if (res.status === 200 || res.status === 304) {
        console.log(context.userState?._id);
        console.log(res.data[0].author);

        if (context.userState?._id !== res.data[0].author) {
          console.log("unable to edit this post you are not the owner");
          setId("");
          return;
        } else {
          let blog = res.data;
          console.log(blog);

          setId(blog.id);
          setTitleState(blog.title);
          setHeadlineState(blog.headline);
          setContent(blog.content);

          const contentBlock = htmlToDraft(blog.content);
          const contentState = ContentState.createFromBlockArray(
            contentBlock.contentBlocks
          );
          const _editorState = EditorState.createWithContent(contentState);
          setEditorState(_editorState);
        }
      } else {
        setError(`unable to retrive blog ${id}`);
        setId("");
      }
    } catch (error) {
      console.log(error);
      // setError(error.message);

      return;
    } finally {
      setLoading(false);
    }
  };
  const createBlog = async () => {
    if (titleState === "" || content === "" || headlineState === "") {
      setSuccess("");
      setError("Please fill out all the required forms");
      console.log("fill all stuff");
      return;
    }
    setError("");
    setSuccess("");
    setSaving(true);
    try {
      const res = await myApi.post("/blog/create", {
        title: titleState,
        content,
        headline: headlineState,
        author: context.userState?._id,
      });
      //todo axios create
      if (res.status === 200) {
        console.log("returened id");
        console.log(res.data);

        console.log(res.data._id);
        setId(res.data._id);
      } else {
        console.log("unable to save");
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };
  const editBlog = async () => {
    try {
      const res = await myApi.patch(`/blog/update/${_id}`, {
        titleState,
        headlineState,
        content,
      });

      //todo update error and success style
      if (res.status === 200) {
        console.log(res);
        setSuccess("Blog updated.");
      } else {
        setError(`Unable to save blog.`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  //! todo
  //todo
  function uploadImageCallBack(file: any) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://api.imgur.com/3/image");
      xhr.setRequestHeader("Authorization", "Client-ID 2fbca8c39fb5c19");
      const data = new FormData();
      data.append("image", file);
      xhr.send(data);
      xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText);
        console.log(response);
        resolve(response);
      });
      xhr.addEventListener("error", () => {
        const error = JSON.parse(xhr.responseText);
        console.log(error);
        reject(error);
      });
    });
  }
  //! todo
  //!todo
  if (loading) return <Spinner />;
  return (
    <div className='container-post'>
      {_id === "" ? <h3>Create Post</h3> : <h3>Update post</h3>}
      {error}
      <div className='editTitle'>
        <label htmlFor='title'>Title:</label>

        <input
          id='title'
          className='postInput1'
          type='text'
          placeholder='Article Title'
          value={titleState}
          onChange={(event) => {
            setTitleState(event.target.value);
          }}
        />
      </div>
      <div className='editHeadline'>
        <label htmlFor='headline'>Headline:</label>
        <input
          id='headline'
          className='postInput2'
          type='text'
          placeholder="What's this Article about?"
          value={headlineState}
          onChange={(event) => {
            setHeadlineState(event.target.value);
          }}
        />
      </div>
      <Editor
        editorState={editorState}
        wrapperClassName='card'
        placeholder='Begin typing...'
        editorClassName='card-body'
        onEditorStateChange={(newState) => {
          setEditorState(newState);
          setContent(draftToHtml(convertToRaw(newState.getCurrentContent())));
        }}
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "list",
            "textAlign",
            "history",
            "embedded",
            "emoji",
            "image",
          ],
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
          image: {
            uploadCallback: uploadImageCallBack,
            alt: { present: true, mandatory: true },
          },
        }}
      />
      <button
        className='blog_handle'
        disabled={saving}
        onClick={() => {
          if (_id !== "") {
            editBlog();
          } else {
            createBlog();
          }
        }}
      >
        {_id === "" ? <h3>Create </h3> : <h3>Update </h3>}
      </button>
      {_id !== "" ? (
        <div className='blog_link'>
          <Link to={`/blog/${_id}`}>View your post</Link>
        </div>
      ) : null}
      <div>
        <div>Preview:</div>
        <div
          className='blog_preview'
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </div>
    </div>
  );
}

import axios from "axios";

let url = "http://localhost:5000/userAuth";
if (process.env.NODE_ENV === "production") {
  url = "/userAuth";
}
export const myApi = axios.create({
  baseURL: url,
});
export const createNewUser = async (newUser) => {
  try {
    const response = await myApi.post("/create", newUser);
    // const response = await axios.post(`${baseURL}/create`, newUser);
    const user = response.data;
    return user;
  } catch (err) {
    return err;
  }
};
export const updateUser = async (updatedUser) => {
  try {
    const formData = new FormData();
    //todo
    formData.append("email", updatedUser.email);
    formData.append("bio", updatedUser.bio);
    formData.append("userName", updatedUser.userName);
    if (updatedUser.password && updatedUser.password.length >= 4) {
      formData.append("password", updatedUser.password);
    }
    formData.append("_id", updatedUser._id);
    if (updatedUser.image) formData.append("image", updatedUser.image);
    const response = await axios.post(url + "/update", formData);
    // const response = await myApi.post("/update", formData);
    const user = response.data;
    return user;
  } catch (err) {
    return err;
  }
};

export const loginUser = async (userLogin) => {
  try {
    const response = await myApi.post(`/login`, userLogin);
    const user = response.data;
    return user;
  } catch (err) {
    return err;
  }
};

// export const logoutUser = async (token) => {
//   await axios.post(`${baseURL}/logout`, null, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };

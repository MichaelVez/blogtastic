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

// export const loginUser = async (userLogin) => {
//   try {
//     const response = await axios.post(`${baseURL}/login`, userLogin);
//     const user = response.data;
//     return user;
//   } catch (err) {
//     return err;
//   }
// };

// export const logoutUser = async (token) => {
//   await axios.post(`${baseURL}/logout`, null, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };

import axios from "axios";
export const domain = "https://mcs-backend-system.herokuapp.com";
<<<<<<< HEAD
import AuthService from "./auth/auth.service";
import chatService from "./messaging/chat.service";
=======
// export const domain = "http://localhost:4600";

>>>>>>> 25ce0efd37334f3d54668f632c88a934071110fe


export const baseUrl = `${domain}/api/v1`

const http = axios.create({
<<<<<<< HEAD
  baseURL: `${domain}/api/v1`,
  headers: { "Content-Type": "application/json" },
=======
  baseURL: baseUrl,
  headers: { 'Content-Type': 'application/json' },
>>>>>>> 25ce0efd37334f3d54668f632c88a934071110fe
});



// http.interceptors.request.use(
//   function (config) {
//     const token = AuthService.getEncToken();
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

export default http;

import axios from "axios";
export const domain = "http://localhost:4600";
import AuthService from './auth/auth.service'


const http = axios.create({
  baseURL: `${domain}/api/v1`,
  headers: { 'Content-Type': 'application/json' },
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
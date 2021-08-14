import axios from "axios";
export const domain = "https://mcs-backend-system.herokuapp.com";
// export const domain = "http://localhost:4600";

export const baseUrl = `${domain}/api/v1`;

const http = axios.create({
  baseURL: baseUrl,
  headers: { "Content-Type": "application/json" },
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

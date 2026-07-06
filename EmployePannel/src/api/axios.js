import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Make sure this matches your port backend url
  timeout: 10000,
});

// Automatically inject JWT Token into all outgoing HTTP headers
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("employeeToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
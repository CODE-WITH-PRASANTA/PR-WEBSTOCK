import axios from "axios";

// Export the root backend server domain (for files, images, attachments)
export const SERVER_URL = "http://localhost:5000";

// API instance configured with /api prefix
const API = axios.create({
  baseURL: `${SERVER_URL}/api`,
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
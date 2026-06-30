import axios from "axios";

// Backend URL
export const BASE_URL = "http://localhost:5000";

// Image URL
export const IMG_URL = BASE_URL;

const API = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
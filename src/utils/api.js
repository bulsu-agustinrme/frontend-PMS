import axios from "axios";
import { getToken } from "./auth";

// Create axios instance with base API URL
const api = axios.create({
  baseURL: "http://localhost:8000/api", // 🔹 adjust if your Laravel API is hosted elsewhere
});

// Attach token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

// Dynamic API base URL - works on both development and production
import axios from "axios";

export const API_BASE_URL =
  import.meta.env.MODE === "production"
    ? window.location.origin // In production, use the same origin as the frontend
    : "http://localhost:5000"; // In development, use localhost

// Axios instance with dynamic base URL
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if it exists
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;

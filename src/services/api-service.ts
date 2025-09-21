// src/services/apiClient.ts
import axios from "axios";
import { clearAuthToken, getAuthToken } from "../helpers/auth-helpers";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // if your API uses cookies/sessions
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle request errors
    if (error.response?.status === 401) {
      // Handle unauthorized errors
      clearAuthToken();
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default apiClient;

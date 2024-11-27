import axios from "axios";
import { getAuth } from "firebase/auth";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use(
  async (config) => {
    const auth = getAuth();

    const token = await auth.currentUser?.getIdToken(true);
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

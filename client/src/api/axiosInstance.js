import axios from "axios";
import { ErrorMessage } from "@/components/Alert-Toast";

const axiosInstance = axios.create({
  // baseURL: "https://mic-learn-plus-server.vercel.app",
  baseURL: "http://localhost:5000",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = JSON.parse(sessionStorage.getItem("accessToken")) || "";

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (err) => {
    ErrorMessage(err.message);
    console.log("Checked")
    Promise.reject(err);
  }
);

export default axiosInstance;

import axios from "axios"
const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:5005/api/" : `${import.meta.env.VITE_BACKEND_URI}/api`,
    timeout: 30000,
    headers: { "Content-Type": "application/json" },
    withCredentials: true
})
export  default axiosInstance;
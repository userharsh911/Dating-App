import axios from "axios"
const axiosInstance = axios.create({
    baseURL: "http://localhost:5005/api/",
    timeout: 30000,
    headers: { "Content-Type": "application/json" },
    withCredentials: true
})
export  default axiosInstance;
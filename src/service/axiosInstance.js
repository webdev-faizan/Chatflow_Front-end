import axios from "axios";
import { Cookies } from "react-cookie";
const cookie = new Cookies();
const axiosInstance = axios.create({
  headers: {
    authorization: `Bearer ${cookie.get("auth")}`,
  },
  baseURL:
    process.env.NODE_ENV == "development" ? "http://localhost:5000/v1" : "null",
});

export default axiosInstance;

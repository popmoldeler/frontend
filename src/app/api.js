import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:80/api/",
  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

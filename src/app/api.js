import axios from "axios";

const api = axios.create({
  baseURL: "https://popmodeler.ledes.net/api/",
  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

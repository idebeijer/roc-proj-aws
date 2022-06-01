import axios from "axios";
import { API_ENDPOINT } from "../config";

export let axiosInstance = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

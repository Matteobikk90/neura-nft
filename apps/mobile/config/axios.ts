import { proxyTarget } from "@/constants/urls";
import axios from "axios";

const api = axios.create({
  baseURL: proxyTarget,
});

export default api;

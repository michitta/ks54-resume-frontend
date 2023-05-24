import { toast } from "react-hot-toast";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3003/api/v1",
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => {
    return res;
  },
  ({ request, response }) => {
    response.status != 401 && toast.error(response?.data?.message);
    return null;
  }
);

export default api;

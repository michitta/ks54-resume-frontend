import axios, { AxiosResponse } from "axios";
import { error, success } from "./toaster";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => {
    if (res.data.message && (res.status == 200 || res.status == 201))
      success(res.data.message);
    return res;
  },
  ({ response }: { response: AxiosResponse }) => {
    if (response?.status != 401) {
      error(
        response?.data?.message
          ? response?.data?.message
          : "Произошла непредвиденная ошибка"
      );
    }
    return null;
  }
);

export default api;

import { error } from "@/utils/toaster";
import api from "../utils/api";

export const authService = {
  async login(email: string, password: string) {
    return api.post("/auth/login", {
      email,
      password,
    });
  },

  async register(fullName: string, email: string, password: string) {
    return api.post("/auth/register", {
      fullName,
      email,
      password,
    });
  },

  async logout() {
    return await api.post("/auth/logout", {
      withCredentials: true,
    });
  },

  async recoveryPass(email: string, password: string) {
    const { data } = await api
      .post("/auth/recovery", {
        email,
        password,
      })
      .catch((e) => {
        error(
          "Возникла ошибка при восстановлении пароля: \n" +
            e.response.data.message
        );
        return {
          data: null,
        };
      });
    if (data) {
      return data;
    }
    return null;
  },

  async me() {
    return api
      .get("/auth/@me")
      .then((res) => res.data)
      .catch(() => null);
  },
};

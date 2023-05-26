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
    return api.post("/auth/logout", {
      withCredentials: true,
    });
  },

  async recoveryPass(email: string, password: string) {
    return api.post("/auth/recovery", {
      email,
      password,
    });
  },

  async me() {
    return api.get("/auth/@me");
  },
};

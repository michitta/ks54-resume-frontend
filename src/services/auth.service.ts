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

  async forgotPass(email: string) {
    return api.post("/auth/forgotPass", {
      email,
    });
  },

  async me() {
    return api
      .get("/auth/@me")
      .then((res) => res.data)
      .catch(() => null);
  },
};

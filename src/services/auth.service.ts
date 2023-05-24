import api from "../utils/api";

export const authService = {
  async login(username: string, password: string) {
    return api.post("/auth/login", {
      username,
      password,
    });
  },

  async register(email: string, username: string, password: string) {
    return api.post("/auth/register", {
      email,
      username,
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

import api from "../utils/api";

export const adminService = {
  async getBySurName(surName: string) {
    return api.get(`/users/bySurName/${surName}`).then((res) => res?.data);
  },

  async getById(uuid: string) {
    return api.get(`/users/${uuid}`).then((res) => res?.data);
  },
};

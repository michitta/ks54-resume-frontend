import api from "../utils/api";

export const studentsService = {
  async getBySurName(surName: string) {
    return api.get(`/students/bySurName/${surName}`).then((res) => res?.data);
  },

  async getById(uuid: string) {
    return api.get(`/students/${uuid}`).then((res) => res?.data);
  },
};

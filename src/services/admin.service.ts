import api from "../utils/api";

export const adminService = {
  async searchStudent(fullName: string) {
    return api.get(`/students/search/${fullName}`).then((res) => res?.data);
  },

  async getStudent(uuid: string) {
    return api.get(`/students/${uuid}`).then((res) => res?.data);
  },

  async setStudent(uuid: string, data: any) {
    return api
      .post(`/students/${uuid}`, {
        data: data,
      })
      .then((res) => res?.data);
  },
};

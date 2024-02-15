import api from "../utils/api";

export const adminService = {
  async searchStudent(fullName: string) {
    return api
      .get(`/admin/search?fullName=${fullName}`)
      .then((res) => res?.data);
  },

  async getStudent(uuid: string) {
    return api.get(`/users/${uuid}`).then((res) => res?.data);
  },

  async setStudent(uuid: string, data: any) {
    return api
      .post(`/admin/${uuid}`, {
        data: data,
      })
      .then((res) => res?.data);
  },

  async deleteStudent(uuid: string) {
    return api.delete(`/admin/${uuid}`).then((res) => res?.data);
  },

  async changeIcon(uuid: string, formData: FormData) {
    return api
      .put(`/admin/icon/${uuid}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res?.data);
  },
};

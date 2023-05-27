import api from "../utils/api";

export const usersService = {
  async getStudent(uuid: string) {
    return api.get(`/users/${uuid}`).then((res) => res?.data);
  },
  async setStudent(data: any) {
    return api
      .post(`/users`, {
        data: data,
      })
      .then((res) => res?.data);
  },
  async deleteStudent() {
    return api.delete(`/users`).then((res) => res?.data);
  },

  async changeIcon(formData: FormData) {
    return api
      .put(`/users/icon`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res?.data);
  },
};

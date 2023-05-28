import api from "../utils/api";

export const usersService = {
  async getStudent(uuid: string) {
    return fetch(`https://owocon.eu.org/api/v1/users/${uuid}`, {
      next: {
        revalidate: 60,
      },
    }).then((res) => (res.ok ? res.json() : null));
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

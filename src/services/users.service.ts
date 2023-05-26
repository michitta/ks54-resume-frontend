import api from "../utils/api";

export const usersService = {
  async setStudent(uuid: string, data: any) {
    return api
      .post(`/students/${uuid}`, {
        data: data,
      })
      .then((res) => res?.data);
  },
};

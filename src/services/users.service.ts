import api from "../utils/api";

export const usersService = {
  async getGroups() {
    return api.get(`/groups`).then((res) => res?.data);
  },
  async getByGroup(groupName: number) {
    return api.get(`/users/byGroup/${groupName}`).then((res) => res?.data);
  },
};

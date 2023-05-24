import api from "../utils/api";

export const usersService = {
  async getById(id: number) {
    return api.get(`/users/${id}`);
  },

  async setProfile(id: number, data: any) {
    return api.post("/users", {
      id,
      data,
    });
  },

  async setSpecialtyCode(id: number, data: any) {
    return api.post("/users", {
      id,
      data: {
        Specialty_Code: {
          connect: {
            data,
          },
        },
      },
    });
  },
  async setStudentAdditionalInfo(id: number, data: any) {
    return api.post("/users", {
      id,
      data: {
        Student_Additional_Info: {
          connect: {
            data,
          },
        },
      },
    });
  },
  async setStudentCompetencies(id: number, data: any) {
    return api.post("/users", {
      id,
      data: {
        Student_Competencies: {
          connect: {
            data,
          },
        },
      },
    });
  },
  async setStudentEducations(id: number, data: any) {
    return api.post("/users", {
      id,
      data: {
        Student_Education: {
          connect: {
            data,
          },
        },
      },
    });
  },
  async setStudentJobs(id: number, data: any) {
    return api.post("/users", {
      id,
      data: {
        Student_job: {
          connect: {
            data,
          },
        },
      },
    });
  },
  async setStudentSoftSkills(id: number, data: any) {
    return api.post("/users", {
      id,
      data: {
        Student_Soft_Skills: {
          connect: {
            data,
          },
        },
      },
    });
  },
  async setStudentPractice(id: number, data: any) {
    return api.post("/users", {
      id,
      data: {
        Student_Practice: {
          connect: {
            data,
          },
        },
      },
    });
  },
};

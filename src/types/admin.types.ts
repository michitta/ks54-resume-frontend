enum driverLicences {
  A,
  B,
  BE,
  C,
  CE,
  D,
  DE,
  M,
  TM,
  TB,
}

enum educationForms {
  fullTime,
  partTime,
  selfStudy,
}

export type loadStudents = {
  uuid: string;
  fullName: string;
  profession: string;
  birthday: string;
  group: string;
  phone: string;
  email: string;
  telegram?: string;
  driverLicence: driverLicences;
  educationForm: educationForms;
  city: string;
  endYear: string;
  professionalSkills: string[];
  socialSkills: string[];
  additionalSkills: string[];
  additionalInfo: string;
  workExperience?: string;
  educations: string[];
  courses: string[];
  awards: string[];
};

import { USER_ROLE } from "../role";

export type User = {
  id: string;
  companyNIT: string;
  name: string;
  lastName: string;
  cedula: string | number;
  email: string;
  phone: string;
  role: USER_ROLE;
  joinDate: string;
};

export type SignUpCompanyForm = {
  nit: string;
  name: string;
  description?: string;
  type: string;
  sector: string;
  address?: string;
  email: string;
  founded?: Date | string | null;
  leaderName: string;
  leaderLastName: string;
  leaderCedula: string | number;
  leaderPhone?: string;
  leaderEmail: string;
  leaderPassword: string;
};

export type CompanyInfoForm = {
  nit: string;
  name: string;
  description: string | null;
  type: string;
  sector: string;
  address: string | null;
  email: string;
  founded: Date | string | null;
};

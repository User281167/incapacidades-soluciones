export type Company = {
  id?: string;
  nit: string;
  name: string;
  description?: string;
  email: string;
  founded: string | Date | null;
  address: string | null;
  type: string;
  sector: string;
};

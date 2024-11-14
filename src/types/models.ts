export type user = {
  id: string;
  companyNIT: string;
  name: string;
  lastName: string;
  cedula: string | number;
  email: string;
  phone: string;
  role: string;
  joinDate: string;
};

export type company = {
  id?: string;
  nit: string;
  name: string;
  description: string;
  email: string;
  address: string;
  type: string;
  sector: string;
  founded: string;
  joinDate: string;
};

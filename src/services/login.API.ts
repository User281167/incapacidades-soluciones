import axios, { AxiosError } from "axios";

import { SignUpCompanyForm } from "@/types/loginForms";
// import { validateSignUpCompany } from "@/utils/validations/login";
import { AuthRes } from "@/types/api-res";

const API = axios.create({
  baseURL: process.env.BACKEND_URL,
  withCredentials: false,
});

export async function signUpCompany(data: SignUpCompanyForm): Promise<AuthRes> {
  // if (!validateSignUpCompany(data)) {
  //   return { errorMessage: "Todos los campos son obligatorios." } as AuthRes;
  // }

  const company = {
    nit: data.nit,
    name: data.name,
    description: data.description,
    type: data.type.toLowerCase(),
    sector: data.sector.toLowerCase(),
    address: data.address,
    email: data.email,
    founded: data.founded ?? "",
  };

  const leader = {
    name: data.leaderName,
    lastName: data.leaderLastName,
    cedula: data.leaderCedula,
    phone: data.leaderPhone,
    email: data.leaderEmail,
    password: data.leaderPassword,
  };

  try {
    const res = await API.post("/api/Auth/signup-company", { company, leader });

    return res.data as AuthRes;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (
      axiosError.response?.status === 400 &&
      typeof axiosError.response.data === "string"
    ) {
      return {
        errorMessage: axiosError.response.data,
      } as AuthRes;
    }

    return {
      errorMessage: "Error interno al registrar la empresa.",
    } as AuthRes;
  }
}

import axios, { AxiosError } from "axios";

import { SignUpCompanyForm } from "@/types/forms/sign-up";
import { ApiRes } from "@/types/api-res";
import { AuthRes } from "@/types/auth";
import { validateSignUpCompany } from "@/utils/validations/login";

const API = axios.create({
  baseURL: process.env.BACKEND_URL,
  withCredentials: false,
});

export async function signUpCompany(
  data: SignUpCompanyForm
): Promise<ApiRes<AuthRes>> {
  if (!validateSignUpCompany(data)) {
    return {
      data: {} as AuthRes,
      errorMessage: "Todos los campos son obligatorios.",
    };
  }

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

    return {
      data: res.data as AuthRes,
      errorMessage: "",
    };
  } catch (error) {
    const axiosError = error as AxiosError;

    if (
      axiosError.response?.status === 400 &&
      typeof axiosError.response.data === "string"
    ) {
      return {
        data: {} as AuthRes,
        errorMessage: axiosError.response.data,
      };
    }

    return {
      data: {} as AuthRes,
      errorMessage: "Error interno al registrar la empresa.",
    };
  }
}

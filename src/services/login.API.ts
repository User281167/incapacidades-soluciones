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
  const checkForm = validateSignUpCompany(data);

  if (!checkForm.success) {
    return {
      data: {} as AuthRes,
      success: false,
      errorMessage:
        checkForm.message ??
        "Campos obligatorios no completados, o revisa los datos ingresados (emails, tipo de empresa, sector de la empresa).",
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
      success: true,
      errorMessage: "",
    };
  } catch (error) {
    const axiosError = error as AxiosError;

    if (
      axiosError.response?.status === 400 &&
      typeof axiosError.response?.data === "string"
    ) {
      return {
        data: {} as AuthRes,
        success: false,
        errorMessage: axiosError.response?.data as string,
      };
    }

    return {
      data: {} as AuthRes,
      success: false,
      errorMessage: "Error interno al registrar la empresa.",
    };
  }
}

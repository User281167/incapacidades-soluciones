import axios from "axios";

import { AuthRes } from "@/types/auth";
import { ApiRes } from "@/types/api-res";
import { SignUpCompanyForm, SignUpEmployeeForm } from "@/types/forms/sign-up";

import {
  validateSignUpCompany,
  validateSignUpEmployee,
} from "@/utils/validations/login";

import { getApiErrorMessage } from "./error-api";

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
    const errorMessage = getApiErrorMessage(error);

    return {
      data: {} as AuthRes,
      success: false,
      errorMessage: errorMessage ?? "Error interno al registrar la empresa.",
    };
  }
}

export async function signUpEmployee(
  data: SignUpEmployeeForm
): Promise<ApiRes<AuthRes>> {
  const checkForm = validateSignUpEmployee(data);

  if (!checkForm.success) {
    return {
      data: {} as AuthRes,
      success: false,
      errorMessage:
        checkForm.message ??
        "Campos obligatorios no completados, o revisa los datos ingresados (emails, tipo de empresa, sector de la empresa).",
    };
  }

  const employee = {
    accessCode: data.accessCode,
    name: data.name,
    lastName: data.lastName,
    cedula: data.cedula,
    phone: data.phone,
    email: data.email,
    password: data.password,
  };

  try {
    const res = await API.post("/api/Auth/signup-employee", { employee });

    return {
      data: res.data as AuthRes,
      success: true,
      errorMessage: "",
    };
  } catch (error) {
    const errorMessage = getApiErrorMessage(error);

    return {
      data: {} as AuthRes,
      success: false,
      errorMessage: errorMessage ?? "Error interno al registrar el empleado.",
    };
  }
}

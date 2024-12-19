import axios from "axios";

import { AuthRes } from "@/types/auth";
import { ApiRes } from "@/types/api-res";
import { SignUpCompanyForm, SignUpEmployeeForm } from "@/types/forms/sign-up";

import {
  validateSignUpCompany,
  validateSignUpEmployee,
} from "@/utils/validations/login";

import { getApiErrorMessage } from "./error-api";
import { BACKEND_URL } from "@/utils/env-config";

const API = axios.create({
  baseURL: BACKEND_URL,
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

  const req: SignUpCompanyForm = {
    nit: data.nit,
    name: data.name,
    description: data.description,
    email: data.email,
    founded: data.founded,
    address: data.address,
    type: data.type.toLowerCase(),
    sector: data.sector.toLowerCase(),
    leaderName: data.leaderName,
    leaderLastName: data.leaderLastName,
    leaderCedula: data.leaderCedula,
    leaderPhone: data.leaderPhone,
    leaderEmail: data.leaderEmail,
    password: data.password,
  };

  try {
    const res = await API.post("/api/Auth/signup-company", req);

    return {
      data: res.data as AuthRes,
      success: true,
      errorMessage: "",
    };
  } catch (error) {
    const errorMessage = getApiErrorMessage(error);

    console.log(error);

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

export async function loginByCedula(
  cedula: string | number,
  password: string
): Promise<ApiRes<AuthRes>> {
  if (!cedula || !password) {
    return {
      data: {} as AuthRes,
      success: false,
      errorMessage: "Campos obligatorios no completados.",
    };
  }

  try {
    const res = await API.post("/api/Auth/login", { cedula, password });

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
      errorMessage: errorMessage ?? "Error al intentar iniciar sesión.",
    };
  }
}

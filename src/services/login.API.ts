import axios from "axios";

import { AuthRes } from "@/types/auth";
import { ApiRes } from "@/types/api-res";
import {
  LoginForm,
  SignUpCompanyForm,
  SignUpEmployeeForm,
} from "@/types/forms/sign-up";

import {
  validateLogin,
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
      message:
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
      message: "",
    };
  } catch (error) {
    const errorMessage = getApiErrorMessage(error);

    return {
      data: {} as AuthRes,
      success: false,
      message: errorMessage ?? "Error interno al registrar la empresa.",
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
      message:
        checkForm.message ??
        "Campos obligatorios no completados, o revisa los datos ingresados (emails, tipo de empresa, sector de la empresa).",
    };
  }

  try {
    const res = await API.post("/api/Auth/signup-user", data);

    return {
      data: res.data as AuthRes,
      success: true,
      message: "",
    };
  } catch (error) {
    const errorMessage = getApiErrorMessage(error);

    return {
      data: {} as AuthRes,
      success: false,
      message: errorMessage ?? "Error interno al registrar el empleado.",
    };
  }
}

export async function loginUser(
  credentials: LoginForm
): Promise<ApiRes<AuthRes>> {
  const checkForm = validateLogin(credentials);

  if (!checkForm.success) {
    return {
      data: {} as AuthRes,
      success: false,
      message: "Campos obligatorios no completados.",
    };
  }

  try {
    const res = await API.post("/api/Auth/login", credentials);

    return {
      data: res.data as AuthRes,
      success: true,
      message: "",
    };
  } catch (error) {
    const errorMessage = getApiErrorMessage(error);

    return {
      data: {} as AuthRes,
      success: false,
      message: errorMessage ?? "Error al intentar iniciar sesión.",
    };
  }
}

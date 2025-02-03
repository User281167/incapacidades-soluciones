import axios from "axios";

import { ApiRes } from "@/types/api-res";
import { Company } from "@/types/models/company";
import { COOKIES_ITEM } from "@/types/cookies-item";

import { BACKEND_URL } from "@/utils/env-config";

import { getApiErrorMessage } from "./error-api";
import Cookies from "js-cookie";
import { CompanyInfoForm } from "@/types/forms/company-info";
import { Validation } from "@/types/validation";
import { CompanyInfoSchema } from "@/types/schemas/company";

const API = axios.create({
  baseURL: BACKEND_URL + "/api/Auth",
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    const token = Cookies.get(COOKIES_ITEM.ACCESS_TOKEN);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function getCompanyInfo(nit: string): Promise<ApiRes<Company>> {
  try {
    const res = await API.get<ApiRes<Company>>("/get-company", {
      params: { nit },
    });

    return res.data;
  } catch (error) {
    const errorMessage = getApiErrorMessage(error);

    return ApiRes.Error<Company>(
      errorMessage ?? "Error al obtener la información de la empresa."
    );
  }
}

export async function updateCompanyInfo(
  company: CompanyInfoForm,
  id: string,
  leaderId: string
): Promise<ApiRes<string>> {
  const validate: Validation = Validation.SchemaForm(
    CompanyInfoSchema,
    company
  );

  if (!validate.success) {
    return ApiRes.Error<string>(
      validate.message ?? "Compruebe los datos ingresados."
    );
  }

  const data = {
    id,
    nit: company.nit,
    name: company.name,
    description: company.description,
    type: company.type,
    sector: company.sector,
    address: company.address,
    email: company.email,
    founded: company.founded,
  } as Company;

  try {
    // backend only return 200 if the company is updated or bad<string message> if not
    const res = await API.put("/update-company", data, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        leaderId,
      },
    });

    if (res.status === 200) {
      return ApiRes.Success<string>("Datos actualizados correctamente");
    } else {
      return ApiRes.Error<string>(
        "Error al actualizar la información de la empresa."
      );
    }
  } catch (error) {
    const errorMessage = getApiErrorMessage(error);

    return ApiRes.Error<string>(
      errorMessage ?? "Error al actualizar la información de la empresa."
    );
  }
}

import axios from "axios";

import { getApiErrorMessage } from "./error-api";

import { ApiRes } from "@/types/api-res";
import { BACKEND_URL } from "@/utils/env-config";
import { Collaborator } from "@/types/models/user";
import { COOKIES_ITEM } from "@/types/cookies-item";

import Cookies from "js-cookie";

const API = axios.create({
  baseURL: BACKEND_URL + "/User",
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

export async function getCollaborator(
  id: string
): Promise<ApiRes<Collaborator>> {
  try {
    const res = await API.get<Collaborator>(`/collaborator/${id}`);

    return {
      data: res.data,
      success: true,
      errorMessage: "",
    };
  } catch (error) {
    const errorMessage = getApiErrorMessage(error);

    return {
      data: {} as Collaborator,
      success: false,
      errorMessage: errorMessage ?? "Error al obtener el colaborador.",
    };
  }
}

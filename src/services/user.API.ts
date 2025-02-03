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
    const res = await API.get<ApiRes<Collaborator>>(`/collaborator/`, {
      params: {
        id: id,
      },
    });

    return res.data;
  } catch (error) {
    const errorMessage = getApiErrorMessage(error);

    return ApiRes.Error<Collaborator>(
      errorMessage ?? "Error al obtener el colaborador."
    );
  }
}

export async function updateAvatar(
  id: string,
  image: File
): Promise<ApiRes<string>> {
  // Check if the image is valid
  if (
    !image ||
    /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(image.name) === false
  ) {
    return ApiRes.Error<string>(
      "Debes seleccionar una foto de perfil de formato JPG, JPEG, PNG, GIF, WEBP o BMP."
    );
  } else if (image.size > 1048576 * 2) {
    return ApiRes.Error<string>("El tamaño máximo de la foto es de 2 MB.");
  }

  try {
    const res = await API.put<ApiRes<string>>(
      `/update-photo/`,
      {
        file: image,
      },
      {
        params: {
          userId: id,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  } catch (error) {
    const errorMessage = getApiErrorMessage(error);
    return ApiRes.Error<string>(errorMessage ?? "Error al actualizar la foto.");
  }
}

import { AxiosError } from "axios";

export const getApiErrorMessage = (error: unknown): string | null => {
  const axiosError = error as AxiosError;

  if (
    axiosError.response?.status === 400 &&
    typeof axiosError.response?.data === "string"
  ) {
    return axiosError.response?.data as string;
  } else if (axiosError.response?.status === 500) {
    return "Error al intentar procesar la solicitud, intenta de nuevo mas tarde";
  }

  return null;
};

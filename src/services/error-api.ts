import { AxiosError } from "axios";

export const getApiErrorMessage = (error: unknown): string | null => {
  const axiosError = error as AxiosError;

  // c# Required array errors
  // data.errors [key, message]
  if (axiosError.response?.status === 400 && axiosError.response?.data) {
    if (axiosError.response?.data?.errors) {
      const errors = axiosError.response.data.errors;

      if (errors.length > 0) {
        return errors.reduce((acc: string, error: string) => {
          return acc + error.message + "\n";
        }, "");
      }
    } else if (typeof axiosError.response?.data === "string") {
      return axiosError.response?.data as string;
    }
  } else if (axiosError.response?.status === 500) {
    return "Error al intentar procesar la solicitud, intenta de nuevo mas tarde.";
  }

  return null;
};

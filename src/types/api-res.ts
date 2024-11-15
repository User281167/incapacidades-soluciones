export type ApiRes<T> = {
  data: T;
  success: boolean;
  errorMessage: string;
};

export class ApiRes<T> {
  data: T;
  success: boolean;
  errorMessage: string;

  constructor(data: T, success: boolean, errorMessage: string) {
    this.data = data;
    this.success = success;
    this.errorMessage = errorMessage;
  }

  public static ApiError<T>(errorMessage: string): ApiRes<T> {
    return new ApiRes<T>({} as T, false, errorMessage);
  }

  public static ApiSuccess<T>(data: T): ApiRes<T> {
    return new ApiRes<T>(data, true, "");
  }
}

export class ApiRes<T> {
  data: T;
  success: boolean;
  message: string | null;

  constructor(data: T, success: boolean, message: string | null) {
    this.data = data;
    this.success = success;
    this.message = message;
  }

  public static Error<T>(message: string): ApiRes<T> {
    return new ApiRes<T>({} as T, false, message);
  }

  public static Success<T>(data: T): ApiRes<T> {
    return new ApiRes<T>(data, true, "");
  }
}

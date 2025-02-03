import { ZodSchema } from "zod";

export class Validation {
  success: boolean;
  message?: string | null;

  constructor(success: boolean, message?: string | null) {
    this.success = success;
    this.message = message;
  }

  static Success(message?: string | null): Validation {
    return new Validation(true, message);
  }

  static Error(message?: string | null): Validation {
    return new Validation(false, message);
  }

  static SchemaForm(schema: ZodSchema, data: any) {
    const parse = schema.safeParse(data);
    const error = parse.error?.errors[0]?.message || null;
    const success = !error;

    return { success, message: error };
  }
}

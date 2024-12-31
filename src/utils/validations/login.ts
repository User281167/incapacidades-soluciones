import {
  LoginForm,
  SignUpCompanyForm,
  SignUpEmployeeForm,
} from "@/types/forms/sign-up";
import {
  LoginSchema,
  SignUpCompanySchema,
  SignUpEmployeeSchema,
} from "@/types/schemas/sign-up";
import { Validation } from "@/types/validation";

export function validateSignUpCompany(data: SignUpCompanyForm): Validation {
  const parse = SignUpCompanySchema.safeParse(data);
  const error = parse.error?.errors[0]?.message || null;
  const success = !error;

  return { success, message: error };
}

export function validateSignUpEmployee(data: SignUpEmployeeForm): Validation {
  const parse = SignUpEmployeeSchema.safeParse(data);
  const error = parse.error?.errors[0]?.message || null;
  const success = !error;

  return { success, message: error };
}

export function validateLogin(data: LoginForm): Validation {
  const parse = LoginSchema.safeParse(data);
  const error = parse.error?.errors[0]?.message || null;
  const success = !error;

  return { success, message: error };
}

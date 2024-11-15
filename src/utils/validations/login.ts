import { SignUpCompanyForm } from "@/types/forms/sign-up";
import { signUpCompanySchema } from "@/types/schemas/sign-up";
import { Validation } from "@/types/validation";

export function validateSignUpCompany(data: SignUpCompanyForm): Validation {
  const parse = signUpCompanySchema.safeParse(data);
  const error = parse.error?.errors[0]?.message || null;
  const success = !error;

  return { success, message: error };
}

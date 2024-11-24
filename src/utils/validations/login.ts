import { SignUpCompanyForm } from "@/types/forms/sign-up";
import { SignUpCompanySchema } from "@/types/schemas/sign-up";
import { Validation } from "@/types/validation";

export function validateSignUpCompany(data: SignUpCompanyForm): Validation {
  const parse = SignUpCompanySchema.safeParse(data);
  const error = parse.error?.errors[0]?.message || null;
  const success = !error;

  return { success, message: error };
}

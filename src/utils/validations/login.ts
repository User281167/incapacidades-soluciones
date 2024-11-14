import { SignUpCompanyForm } from "@/types/forms/sign-up";
import { signUpCompanySchema } from "@/types/schemas/sign-up";

export function validateSignUpCompany(data: SignUpCompanyForm): boolean {
  return signUpCompanySchema.safeParse(data).success;
}

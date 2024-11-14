// import { z, ZodType } from "zod";

// import { SignUpCompanyForm } from "@/types/loginForms";
// import { companySector, companyType } from "@/utils/select-items";

// export const signUpCompanySchema: ZodType<SignUpCompanyForm> = z.object({
//   nit: z.string().min(1, "El NIT es obligatorio"),
//   name: z.string().min(1, "El nombre es obligatorio"),
//   type: z
//     .string()
//     .min(1, "El tipo de empresa es obligatorio")
//     .refine((value) => companyType.includes(value), {
//       message: "El tipo de empresa es inválido",
//     }),
//   description: z.string().optional(),
//   sector: z
//     .string()
//     .min(1, "El sector es obligatorio")
//     .refine((value) => companySector.includes(value), {
//       message: "El sector es inválido",
//     }),
//   address: z.string().optional(),
//   email: z.string().email("Email invalido"),
//   founded: z.string().optional(),
//   leaderName: z.string().min(1, "El nombre del líder es obligatorio"),
//   leaderLastName: z.string().min(1, "El apellido del líder es obligatorio"),
//   leaderCedula: z.string().min(7, "La cédula debe tener al 7 caracteres"),
//   leaderPhone: z.string().optional(),
//   leaderEmail: z.string().email("Email invalido"),
//   leaderPassword: z
//     .string()
//     .min(6, "La contraseña debe tener mínimo 6 caracteres"),
// });

// export function validateSignUpCompany(data: SignUpCompanyForm): boolean {
//   return signUpCompanySchema.safeParse(data).success;
// }

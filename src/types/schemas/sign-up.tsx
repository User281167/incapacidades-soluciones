import { z, ZodType } from "zod";
import { companySector, companyType } from "@/utils/select-items";
import { SignUpCompanyForm, SignUpEmployeeForm } from "@/types/forms/sign-up";

export const SignUpCompanySchema: ZodType<SignUpCompanyForm> = z.object({
  nit: z.string().min(1, "El NIT es obligatorio"),
  name: z.string().min(1, "El nombre es obligatorio"),
  type: z
    .string()
    .min(1, "El tipo de empresa es obligatorio")
    .refine((value: string) => companyType.includes(value), {
      message: "El tipo de empresa es inválido",
    }),
  description: z.string().optional(),
  sector: z
    .string()
    .min(1, "El sector es obligatorio")
    .refine((value: string) => companySector.includes(value), {
      message: "El sector es inválido",
    }),
  address: z.string().optional(),
  email: z.string().email("Email invalido"),
  founded: z.union([z.string(), z.date()]).optional(),
  leaderName: z.string().min(1, "El nombre del líder es obligatorio"),
  leaderLastName: z.string().min(1, "El apellido del líder es obligatorio"),
  leaderCedula: z.string().min(7, "La cédula debe tener al 7 caracteres"),
  leaderPhone: z.string().optional(),
  leaderEmail: z.string().email("Email invalido"),
  leaderPassword: z
    .string()
    .min(6, "La contraseña debe tener mínimo 6 caracteres"),
});

export const SignUpEmployeeSchema: ZodType<SignUpEmployeeForm> = z.object({
  accessCode: z
    .string()
    .min(6, "El código es obligatorio y debe tener 6 caracteres como mínimo"),
  name: z.string().min(1, "El nombre es obligatorio"),
  lastName: z.string().min(1, "El apellido es obligatorio"),
  cedula: z.string().min(7, "La cédula debe tener al 7 caracteres"),
  phone: z.string().optional(),
  email: z.string().email("Email invalido"),
  password: z.string().min(6, "La contraseña debe tener mínimo 6 caracteres"),
});

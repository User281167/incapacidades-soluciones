import { z, ZodType } from "zod";
import { companySector, companyType } from "@/utils/select-items";
import { CompanyInfoForm } from "@/types/forms/company-info";

export const CompanyInfoSchema: ZodType<CompanyInfoForm> = z.object({
  nit: z.string().min(1, "El NIT es obligatorio"),
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().nullable(),
  type: z
    .string()
    .min(1, "El tipo de empresa es obligatorio")
    .refine((value: string) => companyType.includes(value), {
      message: "El tipo de empresa es inválido",
    }),
  sector: z
    .string()
    .min(1, "El sector es obligatorio")
    .refine((value: string) => companySector.includes(value), {
      message: "El sector es inválido",
    }),
  address: z.string().nullable(),
  email: z.string().email("Email invalido"),
  founded: z.union([z.string(), z.date()]).nullable(),
});

import { z } from "zod";

export const profileSchema = z.object({
  full_name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  phone: z.string().optional(),
  birth_month: z.string().optional(),
  birth_year: z.string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      const year = parseInt(val);
      const currentYear = new Date().getFullYear();
      return year >= 1900 && year <= currentYear;
    }, "Ano inválido"),
  gender: z.enum(["masculino", "feminino"]).optional(),
  country: z.string(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
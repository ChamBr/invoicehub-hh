import { z } from "zod";

export const customerFormSchema = z.object({
  type: z.enum(["personal", "company"]),
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido").optional().nullable(),
  phone: z.string().optional().nullable(),
  taxExempt: z.boolean().default(false),
  taxId: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
});

export type CustomerFormValues = z.infer<typeof customerFormSchema>;
import { z } from "zod";

export const customerFormSchema = z.object({
  type: z.enum(["personal", "company"]),
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido").optional().nullable(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  status: z.enum(["active", "inactive"]).default("active"),
  taxExempt: z.boolean().default(false),
  taxId: z.string().optional().nullable(),
  contactName: z.string().optional().nullable(),
  country: z.string().default("US"),
});

export type CustomerFormValues = z.infer<typeof customerFormSchema>;

export interface CustomerFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  initialData?: CustomerFormValues | null;
  subscriberId?: string;
}

export const addressFormats = {
  US: {
    taxIdLabel: "Tax ID (EIN)",
    taxIdMask: "XX-XXXXXXX",
  },
  BR: {
    taxIdLabel: "CPF/CNPJ",
    taxIdMask: "XXX.XXX.XXX-XX",
  },
} as const;
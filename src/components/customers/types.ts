import { z } from "zod";

export const customerFormSchema = z.object({
  id: z.string().optional(),
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

export interface CustomerFromDB {
  id: string;
  created_at: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  notes: string | null;
  status: string;
  type: string;
  tax_exempt: boolean;
  tax_id: string | null;
  contact_name: string | null;
  subscriber_id: string | null;
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
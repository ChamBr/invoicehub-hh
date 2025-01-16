import { z } from "zod";

const phoneRegexBR = /^\+55 \(\d{2}\) \d{5}-\d{4}$/;
const phoneRegexUS = /^\+1 \(\d{3}\) \d{3}-\d{4}$/;

export const customerFormSchema = z.object({
  id: z.string().optional(),
  type: z.enum(["personal", "company"]),
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  contactName: z.string().optional().nullable(),
  email: z.string().email("Email inválido").optional().nullable(),
  country: z.string().min(2, "País é obrigatório"),
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

export type AddressFormat = {
  zipLabel: string;
  stateLabel: string;
  cityLabel: string;
  addressLabel: string;
  taxIdLabel: string;
  taxIdMask: string;
};

export const addressFormats: Record<string, AddressFormat> = {
  BR: {
    zipLabel: "CEP",
    stateLabel: "Estado",
    cityLabel: "Cidade",
    addressLabel: "Endereço",
    taxIdLabel: "CPF/CNPJ",
    taxIdMask: "999.999.999-99",
  },
  US: {
    zipLabel: "ZIP Code",
    stateLabel: "State",
    cityLabel: "City",
    addressLabel: "Address",
    taxIdLabel: "Tax ID",
    taxIdMask: "99-9999999",
  },
};
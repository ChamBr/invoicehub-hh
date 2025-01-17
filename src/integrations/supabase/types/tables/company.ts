import { Json } from '../common';

export interface CompanyProfile {
  id: string;
  user_id: string;
  company_name: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  country: string | null;
  phone: string | null;
  mobile: string | null;
  display_phone: boolean | null;
  tax_id: string | null;
  display_tax_id: boolean | null;
  email: string | null;
  website: string | null;
  logo_url: string | null;
  display_logo: boolean | null;
  created_at: string;
  updated_at: string;
  invoice_prefix: string | null;
  invoice_next_number: number | null;
  invoice_footer: string | null;
  invoice_terms: string | null;
  invoice_due_days: number | null;
  invoice_currency: string | null;
  invoice_template: string | null;
  active_template_id: string | null;
}
import { Json } from './common';

export interface CompanyTables {
  company_profiles: {
    Row: {
      active_template_id: string | null
      address_line1: string | null
      address_line2: string | null
      city: string | null
      company_name: string | null
      country: string | null
      created_at: string
      display_logo: boolean | null
      display_phone: boolean | null
      display_tax_id: boolean | null
      email: string | null
      id: string
      invoice_currency: string | null
      invoice_due_days: number | null
      invoice_footer: string | null
      invoice_next_number: number | null
      invoice_prefix: string | null
      invoice_template: string | null
      invoice_terms: string | null
      logo_url: string | null
      mobile: string | null
      phone: string | null
      state: string | null
      tax_id: string | null
      updated_at: string
      user_id: string
      website: string | null
      zip_code: string | null
    }
    Insert: {
      active_template_id?: string | null
      address_line1?: string | null
      address_line2?: string | null
      city?: string | null
      company_name?: string | null
      country?: string | null
      created_at?: string
      display_logo?: boolean | null
      display_phone?: boolean | null
      display_tax_id?: boolean | null
      email?: string | null
      id?: string
      invoice_currency?: string | null
      invoice_due_days?: number | null
      invoice_footer?: string | null
      invoice_next_number?: number | null
      invoice_prefix?: string | null
      invoice_template?: string | null
      invoice_terms?: string | null
      logo_url?: string | null
      mobile?: string | null
      phone?: string | null
      state?: string | null
      tax_id?: string | null
      updated_at?: string
      user_id: string
      website?: string | null
      zip_code?: string | null
    }
    Update: {
      active_template_id?: string | null
      address_line1?: string | null
      address_line2?: string | null
      city?: string | null
      company_name?: string | null
      country?: string | null
      created_at?: string
      display_logo?: boolean | null
      display_phone?: boolean | null
      display_tax_id?: boolean | null
      email?: string | null
      id?: string
      invoice_currency?: string | null
      invoice_due_days?: number | null
      invoice_footer?: string | null
      invoice_next_number?: number | null
      invoice_prefix?: string | null
      invoice_template?: string | null
      invoice_terms?: string | null
      logo_url?: string | null
      mobile?: string | null
      phone?: string | null
      state?: string | null
      tax_id?: string | null
      updated_at?: string
      user_id?: string
      website?: string | null
      zip_code?: string | null
    }
  }
}
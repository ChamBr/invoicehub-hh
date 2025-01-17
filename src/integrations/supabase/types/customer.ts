export interface CustomerTables {
  customers: {
    Row: {
      address: string | null
      city: string | null
      contact_name: string | null
      created_at: string
      email: string | null
      id: string
      name: string
      notes: string | null
      phone: string | null
      state: string | null
      status: string | null
      tax_exempt: boolean | null
      tax_id: string | null
      type: string | null
      zip_code: string | null
    }
    Insert: {
      address?: string | null
      city?: string | null
      contact_name?: string | null
      created_at?: string
      email?: string | null
      id?: string
      name: string
      notes?: string | null
      phone?: string | null
      state?: string | null
      status?: string | null
      tax_exempt?: boolean | null
      tax_id?: string | null
      type?: string | null
      zip_code?: string | null
    }
    Update: {
      address?: string | null
      city?: string | null
      contact_name?: string | null
      created_at?: string
      email?: string | null
      id?: string
      name?: string
      notes?: string | null
      phone?: string | null
      state?: string | null
      status?: string | null
      tax_exempt?: boolean | null
      tax_id?: string | null
      type?: string | null
      zip_code?: string | null
    }
  }
}
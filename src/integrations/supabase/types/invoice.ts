import { Json } from './common';

export interface InvoiceTables {
  invoice_items: {
    Row: {
      description: string
      has_tax: boolean | null
      id: string
      invoice_id: string
      price: number
      product_id: string | null
      quantity: number
      total: number
    }
    Insert: {
      description: string
      has_tax?: boolean | null
      id?: string
      invoice_id: string
      price: number
      product_id?: string | null
      quantity?: number
      total: number
    }
    Update: {
      description?: string
      has_tax?: boolean | null
      id?: string
      invoice_id?: string
      price?: number
      product_id?: string | null
      quantity?: number
      total?: number
    }
  }
  invoice_templates: {
    Row: {
      content: Json
      created_at: string
      created_by: string | null
      description: string | null
      header_background_color: string | null
      header_text_color: string | null
      id: string
      is_default: boolean | null
      name: string
      show_hours: boolean | null
      show_rate: boolean | null
      table_style: string | null
      type: "default" | "simple" | "detailed" | "professional" | "custom"
      updated_at: string
    }
    Insert: {
      content?: Json
      created_at?: string
      created_by?: string | null
      description?: string | null
      header_background_color?: string | null
      header_text_color?: string | null
      id?: string
      is_default?: boolean | null
      name: string
      show_hours?: boolean | null
      show_rate?: boolean | null
      table_style?: string | null
      type?: "default" | "simple" | "detailed" | "professional" | "custom"
      updated_at?: string
    }
    Update: {
      content?: Json
      created_at?: string
      created_by?: string | null
      description?: string | null
      header_background_color?: string | null
      header_text_color?: string | null
      id?: string
      is_default?: boolean | null
      name?: string
      show_hours?: boolean | null
      show_rate?: boolean | null
      table_style?: string | null
      type?: "default" | "simple" | "detailed" | "professional" | "custom"
      updated_at?: string
    }
  }
  invoices: {
    Row: {
      created_at: string
      customer_id: string
      due_date: string
      email_sent_at: string | null
      id: string
      notes: string | null
      pdf_generated_at: string | null
      pdf_url: string | null
      status: "draft" | "created" | "sent" | "pending" | "overdue" | "cancelled" | "paid" | null
      template_id: string | null
      total: number
    }
    Insert: {
      created_at?: string
      customer_id: string
      due_date: string
      email_sent_at?: string | null
      id?: string
      notes?: string | null
      pdf_generated_at?: string | null
      pdf_url?: string | null
      status?: "draft" | "created" | "sent" | "pending" | "overdue" | "cancelled" | "paid" | null
      template_id?: string | null
      total?: number
    }
    Update: {
      created_at?: string
      customer_id?: string
      due_date?: string
      email_sent_at?: string | null
      id?: string
      notes?: string | null
      pdf_generated_at?: string | null
      pdf_url?: string | null
      status?: "draft" | "created" | "sent" | "pending" | "overdue" | "cancelled" | "paid" | null
      template_id?: string | null
      total?: number
    }
  }
}
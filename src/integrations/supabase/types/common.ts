export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: CompanyTables & 
           CustomerTables & 
           InvoiceTables & 
           ProductTables & 
           SettingsTables & 
           UserTables
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_debug_mode_valid: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      config_type: "feature" | "test" | "appearance"
      invoice_status:
        | "draft"
        | "created"
        | "sent"
        | "pending"
        | "overdue"
        | "cancelled"
        | "paid"
      invoice_template_type:
        | "default"
        | "simple"
        | "detailed"
        | "professional"
        | "custom"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      company_profiles: {
        Row: {
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
        Relationships: []
      }
      customers: {
        Row: {
          address: string | null
          city: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          state: string | null
          status: string | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          state?: string | null
          status?: string | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          state?: string | null
          status?: string | null
          zip_code?: string | null
        }
        Relationships: []
      }
      feedback: {
        Row: {
          created_at: string
          customer_id: string | null
          description: string
          id: string
          priority: string | null
          resolved_at: string | null
          status: string | null
          title: string
          type: string
        }
        Insert: {
          created_at?: string
          customer_id?: string | null
          description: string
          id?: string
          priority?: string | null
          resolved_at?: string | null
          status?: string | null
          title: string
          type: string
        }
        Update: {
          created_at?: string
          customer_id?: string | null
          description?: string
          id?: string
          priority?: string | null
          resolved_at?: string | null
          status?: string | null
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "feedback_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_items: {
        Row: {
          description: string
          id: string
          invoice_id: string
          price: number
          product_id: string | null
          quantity: number
          total: number
        }
        Insert: {
          description: string
          id?: string
          invoice_id: string
          price: number
          product_id?: string | null
          quantity?: number
          total: number
        }
        Update: {
          description?: string
          id?: string
          invoice_id?: string
          price?: number
          product_id?: string | null
          quantity?: number
          total?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoice_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          created_at: string
          customer_id: string
          due_date: string
          id: string
          notes: string | null
          status: string | null
          total: number
        }
        Insert: {
          created_at?: string
          customer_id: string
          due_date: string
          id?: string
          notes?: string | null
          status?: string | null
          total?: number
        }
        Update: {
          created_at?: string
          customer_id?: string
          due_date?: string
          id?: string
          notes?: string | null
          status?: string | null
          total?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoices_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      plans: {
        Row: {
          billing_period: string
          created_at: string
          description: string | null
          features: Json | null
          id: string
          name: string
          price: number
          status: string | null
        }
        Insert: {
          billing_period: string
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          name: string
          price: number
          status?: string | null
        }
        Update: {
          billing_period?: string
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          name?: string
          price?: number
          status?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          price: number
          sku: string | null
          status: string | null
          stock: number | null
          type: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          price: number
          sku?: string | null
          status?: string | null
          stock?: number | null
          type: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          price?: number
          sku?: string | null
          status?: string | null
          stock?: number | null
          type?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company: string | null
          created_at: string
          full_name: string | null
          id: string
          preferences: Json | null
          role: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          preferences?: Json | null
          role?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          preferences?: Json | null
          role?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          billing_period: string
          created_at: string
          customer_id: string
          end_date: string | null
          id: string
          plan_id: string
          renewal_date: string | null
          start_date: string
          status: string | null
        }
        Insert: {
          billing_period: string
          created_at?: string
          customer_id: string
          end_date?: string | null
          id?: string
          plan_id: string
          renewal_date?: string | null
          start_date?: string
          status?: string | null
        }
        Update: {
          billing_period?: string
          created_at?: string
          customer_id?: string
          end_date?: string | null
          id?: string
          plan_id?: string
          renewal_date?: string | null
          start_date?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

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
      configurations: {
        Row: {
          created_at: string
          debug_activated_at: string | null
          description: string | null
          gradient_colors: Json | null
          id: string
          is_enabled: boolean | null
          name: string
          type: Database["public"]["Enums"]["config_type"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          debug_activated_at?: string | null
          description?: string | null
          gradient_colors?: Json | null
          id?: string
          is_enabled?: boolean | null
          name: string
          type: Database["public"]["Enums"]["config_type"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          debug_activated_at?: string | null
          description?: string | null
          gradient_colors?: Json | null
          id?: string
          is_enabled?: boolean | null
          name?: string
          type?: Database["public"]["Enums"]["config_type"]
          updated_at?: string
        }
        Relationships: []
      }
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
        Relationships: []
      }
      email_settings: {
        Row: {
          created_at: string
          id: string
          sender_email: string
          sender_name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          sender_email?: string
          sender_name?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          sender_email?: string
          sender_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      exchange_rates: {
        Row: {
          created_at: string
          currency_code: string
          id: string
          rate: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          currency_code: string
          id?: string
          rate: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          currency_code?: string
          id?: string
          rate?: number
          updated_at?: string
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
      invoice_templates: {
        Row: {
          content: Json
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_default: boolean | null
          name: string
          type: Database["public"]["Enums"]["invoice_template_type"]
          updated_at: string
        }
        Insert: {
          content?: Json
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_default?: boolean | null
          name: string
          type?: Database["public"]["Enums"]["invoice_template_type"]
          updated_at?: string
        }
        Update: {
          content?: Json
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_default?: boolean | null
          name?: string
          type?: Database["public"]["Enums"]["invoice_template_type"]
          updated_at?: string
        }
        Relationships: []
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
          status: Database["public"]["Enums"]["invoice_status"] | null
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
          status?: Database["public"]["Enums"]["invoice_status"] | null
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
          status?: Database["public"]["Enums"]["invoice_status"] | null
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
      payment_integrations: {
        Row: {
          config: Json | null
          created_at: string
          id: string
          is_enabled: boolean | null
          name: string
          provider: string
          updated_at: string
        }
        Insert: {
          config?: Json | null
          created_at?: string
          id?: string
          is_enabled?: boolean | null
          name: string
          provider: string
          updated_at?: string
        }
        Update: {
          config?: Json | null
          created_at?: string
          id?: string
          is_enabled?: boolean | null
          name?: string
          provider?: string
          updated_at?: string
        }
        Relationships: []
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
          birth_date: string | null
          company: string | null
          country: string | null
          created_at: string
          full_name: string | null
          gender: string | null
          id: string
          phone: string | null
          preferences: Json | null
          role: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          birth_date?: string | null
          company?: string | null
          country?: string | null
          created_at?: string
          full_name?: string | null
          gender?: string | null
          id: string
          phone?: string | null
          preferences?: Json | null
          role?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          birth_date?: string | null
          company?: string | null
          country?: string | null
          created_at?: string
          full_name?: string | null
          gender?: string | null
          id?: string
          phone?: string | null
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
      system_settings: {
        Row: {
          created_at: string
          feature_key: string
          id: string
          is_enabled: boolean | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          feature_key: string
          id?: string
          is_enabled?: boolean | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          feature_key?: string
          id?: string
          is_enabled?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      user_dashboard_metrics: {
        Row: {
          created_at: string
          id: string
          metrics: string[]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          metrics?: string[]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          metrics?: string[]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
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

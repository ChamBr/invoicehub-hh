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
        Relationships: [
          {
            foreignKeyName: "company_profiles_active_template_id_fkey"
            columns: ["active_template_id"]
            isOneToOne: false
            referencedRelation: "invoice_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      company_settings: {
        Row: {
          address_line1: string
          address_line2: string
          city: string
          company_name: string
          country: string
          created_at: string
          email: string
          id: string
          phone: string
          state: string
          updated_at: string
          website: string
          zip_code: string
        }
        Insert: {
          address_line1?: string
          address_line2?: string
          city?: string
          company_name?: string
          country?: string
          created_at?: string
          email?: string
          id?: string
          phone?: string
          state?: string
          updated_at?: string
          website?: string
          zip_code?: string
        }
        Update: {
          address_line1?: string
          address_line2?: string
          city?: string
          company_name?: string
          country?: string
          created_at?: string
          email?: string
          id?: string
          phone?: string
          state?: string
          updated_at?: string
          website?: string
          zip_code?: string
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
          system_version: string | null
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
          system_version?: string | null
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
          system_version?: string | null
          type?: Database["public"]["Enums"]["config_type"]
          updated_at?: string
        }
        Relationships: []
      }
      countries: {
        Row: {
          code: string
          created_at: string
          id: string
          is_active: boolean | null
          name_en: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          name_en: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          name_en?: string
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
          subscriber_id: string | null
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
          subscriber_id?: string | null
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
          subscriber_id?: string | null
          tax_exempt?: boolean | null
          tax_id?: string | null
          type?: string | null
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_subscriber_id_fkey"
            columns: ["subscriber_id"]
            isOneToOne: false
            referencedRelation: "subscribers"
            referencedColumns: ["id"]
          },
        ]
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
      footer_settings: {
        Row: {
          center_text: string | null
          container_height: string | null
          created_at: string
          font_size: string | null
          id: string
          left_text: string | null
          refresh_button_color: string | null
          refresh_button_size: string | null
          right_text: string | null
          show_refresh_button: boolean | null
          text_alpha: number | null
          text_color: string | null
          updated_at: string
        }
        Insert: {
          center_text?: string | null
          container_height?: string | null
          created_at?: string
          font_size?: string | null
          id?: string
          left_text?: string | null
          refresh_button_color?: string | null
          refresh_button_size?: string | null
          right_text?: string | null
          show_refresh_button?: boolean | null
          text_alpha?: number | null
          text_color?: string | null
          updated_at?: string
        }
        Update: {
          center_text?: string | null
          container_height?: string | null
          created_at?: string
          font_size?: string | null
          id?: string
          left_text?: string | null
          refresh_button_color?: string | null
          refresh_button_size?: string | null
          right_text?: string | null
          show_refresh_button?: boolean | null
          text_alpha?: number | null
          text_color?: string | null
          updated_at?: string
        }
        Relationships: []
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
          header_background_color: string | null
          header_text_color: string | null
          id: string
          is_default: boolean | null
          name: string
          show_hours: boolean | null
          show_rate: boolean | null
          table_style: string | null
          type: Database["public"]["Enums"]["invoice_template_type"]
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
          type?: Database["public"]["Enums"]["invoice_template_type"]
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
          subscriber_id: string | null
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
          status?: Database["public"]["Enums"]["invoice_status"] | null
          subscriber_id?: string | null
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
          status?: Database["public"]["Enums"]["invoice_status"] | null
          subscriber_id?: string | null
          template_id?: string | null
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
          {
            foreignKeyName: "invoices_subscriber_id_fkey"
            columns: ["subscriber_id"]
            isOneToOne: false
            referencedRelation: "subscribers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "invoice_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      landing_page_content: {
        Row: {
          button_link: string | null
          button_text: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          order_index: number
          section: string
          title: string
          updated_at: string
        }
        Insert: {
          button_link?: string | null
          button_text?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          order_index?: number
          section: string
          title: string
          updated_at?: string
        }
        Update: {
          button_link?: string | null
          button_text?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          order_index?: number
          section?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
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
          discount_annual: number | null
          discount_semiannual: number | null
          features: Json | null
          id: string
          name: string
          price: number
          price_annual: number | null
          price_monthly: number | null
          price_semiannual: number | null
          status: string | null
        }
        Insert: {
          billing_period: string
          created_at?: string
          description?: string | null
          discount_annual?: number | null
          discount_semiannual?: number | null
          features?: Json | null
          id?: string
          name: string
          price: number
          price_annual?: number | null
          price_monthly?: number | null
          price_semiannual?: number | null
          status?: string | null
        }
        Update: {
          billing_period?: string
          created_at?: string
          description?: string | null
          discount_annual?: number | null
          discount_semiannual?: number | null
          features?: Json | null
          id?: string
          name?: string
          price?: number
          price_annual?: number | null
          price_monthly?: number | null
          price_semiannual?: number | null
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
          subscriber_id: string | null
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
          subscriber_id?: string | null
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
          subscriber_id?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_subscriber_id_fkey"
            columns: ["subscriber_id"]
            isOneToOne: false
            referencedRelation: "subscribers"
            referencedColumns: ["id"]
          },
        ]
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
      subscriber_users: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["user_role"] | null
          status: string | null
          subscriber_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"] | null
          status?: string | null
          subscriber_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"] | null
          status?: string | null
          subscriber_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriber_users_subscriber_id_fkey"
            columns: ["subscriber_id"]
            isOneToOne: false
            referencedRelation: "subscribers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriber_users_user_id_profiles_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subscribers: {
        Row: {
          company_name: string | null
          created_at: string
          id: string
          owner_id: string | null
          plan_id: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          id?: string
          owner_id?: string | null
          plan_id?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          company_name?: string | null
          created_at?: string
          id?: string
          owner_id?: string | null
          plan_id?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscribers_plan_id_fkey"
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
      testimonials: {
        Row: {
          avatar_url: string | null
          company: string | null
          content: string
          created_at: string
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          name: string
          rating: number | null
          role: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          company?: string | null
          content: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          name: string
          rating?: number | null
          role?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          company?: string | null
          content?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          name?: string
          rating?: number | null
          role?: string | null
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
      user_onboarding: {
        Row: {
          completed_at: string | null
          created_at: string
          has_company_profile: boolean | null
          has_subscription: boolean | null
          id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          has_company_profile?: boolean | null
          has_subscription?: boolean | null
          id?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          has_company_profile?: boolean | null
          has_subscription?: boolean | null
          id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_user_onboarding: {
        Args: {
          user_uuid: string
        }
        Returns: Json
      }
      clean_test_data: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      is_debug_mode_valid: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      simulate_subscriber_login: {
        Args: {
          subscriber_id: string
        }
        Returns: Json
      }
      update_existing_records: {
        Args: Record<PropertyKey, never>
        Returns: undefined
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
      user_role: "superadmin" | "admin" | "user" | "dependent"
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

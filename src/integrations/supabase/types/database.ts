export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          full_name: string | null
          avatar_url: string | null
          company: string | null
          role: string | null
          preferences: Json | null
          phone: string | null
          birth_date: string | null
          gender: string | null
          country: string | null
          email: string | null
        }
      }
      subscribers: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          company_name: string | null
          status: string | null
          owner_id: string | null
          plan_id: string | null
        }
      }
      subscriber_users: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          subscriber_id: string | null
          user_id: string | null
          role: 'superadmin' | 'admin' | 'user' | 'dependent' | null
          status: string | null
        }
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
  }
}

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]
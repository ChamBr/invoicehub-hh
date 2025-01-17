import { Database } from './database';
import { Json } from './common';

export interface UserTables {
  profiles: {
    Row: Database['public']['Tables']['profiles']['Row']
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
  }
}
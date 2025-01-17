import { Json } from './common';

export interface SettingsTables {
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
      type: "feature" | "test" | "appearance"
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
      type: "feature" | "test" | "appearance"
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
      type?: "feature" | "test" | "appearance"
      updated_at?: string
    }
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
  }
}
import { Json } from '../common';

export interface Configuration {
  id: string;
  name: string;
  description: string | null;
  type: 'feature' | 'test' | 'appearance';
  is_enabled: boolean | null;
  created_at: string;
  updated_at: string;
  debug_activated_at: string | null;
  gradient_colors: Json | null;
  system_version: string | null;
}
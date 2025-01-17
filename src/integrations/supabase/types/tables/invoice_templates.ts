import { Json } from '../common';

export interface InvoiceTemplate {
  id: string;
  content: Json;
  created_at: string;
  created_by: string | null;
  description: string | null;
  header_background_color: string | null;
  header_text_color: string | null;
  is_default: boolean | null;
  name: string;
  show_hours: boolean | null;
  show_rate: boolean | null;
  table_style: string | null;
  type: 'default' | 'simple' | 'detailed' | 'professional' | 'custom';
  updated_at: string;
}
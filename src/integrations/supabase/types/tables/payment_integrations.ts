import { Json } from '../common';

export interface PaymentIntegration {
  id: string;
  name: string;
  provider: string;
  config: Json | null;
  is_enabled: boolean | null;
  created_at: string;
  updated_at: string;
}
import { Json } from '../common';

export interface Plan {
  id: string;
  name: string;
  description: string | null;
  price: number;
  billing_period: string;
  created_at: string;
  updated_at: string;
  discount_annual: number | null;
  discount_semiannual: number | null;
  price_annual: number | null;
  price_monthly: number | null;
  price_semiannual: number | null;
  status: string | null;
  features: Json | null;
}
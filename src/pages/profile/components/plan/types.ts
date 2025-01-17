export interface PlanFeatures {
  max_users: number;
  max_invoices: number;
  max_products: number;
  max_customers: number;
  logo_replace: boolean;
  invoice_templates: boolean;
  ai_translations: boolean;
  disk_space: number;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  price_monthly: number;
  features: PlanFeatures;
  status: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: string;
  start_date: string;
  renewal_date: string;
  billing_period: string;
  plan?: Plan;
}
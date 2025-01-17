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
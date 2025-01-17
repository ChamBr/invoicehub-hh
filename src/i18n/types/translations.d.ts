export interface PlanFeatures {
  logo_replace: boolean;
  max_invoices: number;
  max_products: number;
  translations: boolean;
  max_customers: number;
  invoice_templates: boolean;
  storage_gb: number;
  max_users: number;
}

export interface PlanTranslations {
  title: string;
  monthly: string;
  yearly: string;
  features: string;
  no_subscription: string;
  subscribe: string;
  change: string;
  current_plan: string;
  available_plans: string;
  upgrade: string;
  yes: string;
  no: string;
  unlimited: string;
  next_billing: string;
  descriptions: {
    free: string;
    starter: string;
    scale: string;
  };
  features: {
    max_users: string;
    storage_gb: string;
    logo_replace: string;
    max_products: string;
    ai_assistance: string;
    max_customers: string;
    invoice_templates: string;
    max_invoices: string;
    translations: string;
  };
  no_plan_message: string;
  change_success: string;
  change_success_description: string;
  change_error: string;
  change_error_description: string;
}

export interface Translations {
  plan: PlanTranslations;
}
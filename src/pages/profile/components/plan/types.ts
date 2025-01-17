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
  description: string | null;
  price_monthly: number;
  features: PlanFeatures;
  status: string | null;
  billing_period: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: string;
  start_date: string;
  renewal_date: string | null;
  billing_period: string;
  customer_id: string;
  plan?: Plan;
}

export interface PlanSelectionProps {
  onClose?: () => void;
  onPlanSelected?: (plan: Plan) => Promise<void>;
  currentPlan?: Plan;
  showUpgradeOnly?: boolean;
}
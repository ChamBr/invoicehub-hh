export interface PlanFeatures {
  max_users: number;
  max_invoices_per_month: number;
  max_products: number;
  max_customers: number;
  logo_replace: boolean;
  invoice_templates: boolean;
  ai_assistance: boolean;
  storage_gb: number;
}

export interface Plan {
  id: string;
  name: string;
  description: string | null;
  price_monthly: number;
  price_annual: number | null;
  price_semiannual: number | null;
  discount_annual: number | null;
  discount_semiannual: number | null;
  features: PlanFeatures;
  status: string;
  billing_period: string;
  price: number;
  created_at: string;
}

export interface PlanCardProps {
  plan: Plan;
  isCurrentPlan: boolean;
  onSelect: (plan: Plan) => void;
}

export interface PlanSelectionProps {
  onClose?: () => void;
  onPlanSelected?: (plan: Plan) => Promise<void>;
  currentPlan?: Plan;
  showUpgradeOnly?: boolean;
}
export interface PlanFeatures {
  logo_replace: boolean;
  max_invoices: number;
  max_products: number;
  translations: boolean;
  max_customers: number;
  invoice_templates: boolean;
}

export interface Plan {
  id: string;
  name: string;
  description: string | null;
  price: number;
  billing_period: string;
  features: PlanFeatures;
  status: string;
  price_monthly: number | null;
  price_semiannual: number | null;
  price_annual: number | null;
  discount_semiannual: number | null;
  discount_annual: number | null;
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
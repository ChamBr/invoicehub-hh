import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plan } from "@/pages/profile/components/plan/types";

interface PlanCardProps {
  plan: Plan;
  formatCurrency: (value: number) => string;
  onEdit: (id: string) => void;
}

export function PlanCard({ plan, formatCurrency, onEdit }: PlanCardProps) {
  const features = typeof plan.features === 'string' 
    ? JSON.parse(plan.features) 
    : plan.features;

  const formatFeature = (value: number | boolean) => {
    if (typeof value === 'boolean') return value ? "Yes" : "No";
    if (value === -1) return "Unlimited";
    if (typeof value === 'number' && value < 1) return `${value * 1000}MB`;
    return value;
  };

  return (
    <Card className={`p-6 ${plan.status === 'inactive' ? 'opacity-60' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{plan.name}</h3>
            {plan.status === 'inactive' && (
              <Badge variant="secondary">Inactive</Badge>
            )}
          </div>
          <p className="text-sm text-gray-500">{plan.description}</p>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onEdit(plan.id)}
        >
          Edit
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-2xl font-bold">
            {formatCurrency(plan.price_monthly)}
            <span className="text-sm font-normal text-gray-500">/month</span>
          </p>
          {plan.price_annual > 0 && (
            <p className="text-sm text-gray-500">
              {formatCurrency(plan.price_annual)}/year ({plan.discount_annual}% off)
            </p>
          )}
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Features:</h4>
          <ul className="space-y-2 text-sm">
            <li>Users: {formatFeature(features.max_users)}</li>
            <li>Invoices per month: {formatFeature(features.max_invoices)}</li>
            <li>Products: {formatFeature(features.max_products)}</li>
            <li>Customers: {formatFeature(features.max_customers)}</li>
            <li>Storage: {formatFeature(features.storage_gb)} GB</li>
            <li>Logo Replacement: {formatFeature(features.logo_replace)}</li>
            <li>Custom Templates: {formatFeature(features.invoice_templates)}</li>
            <li>Translations: {formatFeature(features.translations)}</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
import { ArrowUp, ArrowDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plan } from "./types";
import { PlanFeaturesList } from "./PlanFeaturesList";

interface PlanCardProps {
  plan: Plan;
  isCurrentPlan: boolean;
  isUpgrade: boolean;
  isDowngrade: boolean;
  onSelect: (plan: Plan) => void;
}

export function PlanCard({ 
  plan, 
  isCurrentPlan, 
  isUpgrade, 
  isDowngrade, 
  onSelect 
}: PlanCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <Card className={`p-4 relative ${isCurrentPlan ? "border-2 border-primary" : ""}`}>
      {isCurrentPlan && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm">
          Current Plan
        </div>
      )}
      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold">{plan.name}</h3>
          <p className="text-sm text-gray-500">{plan.description}</p>
        </div>

        <div className="text-2xl font-bold text-primary">
          {formatCurrency(plan.price_monthly)}
          <span className="text-sm font-normal text-gray-500">/month</span>
        </div>

        <PlanFeaturesList features={plan.features} />

        <Button
          className="w-full mt-4"
          variant={isCurrentPlan ? "outline" : "default"}
          onClick={() => onSelect(plan)}
          disabled={isCurrentPlan}
        >
          {isCurrentPlan ? (
            "Current Plan"
          ) : isUpgrade ? (
            <>
              <ArrowUp className="h-4 w-4 mr-2" />
              Upgrade
            </>
          ) : isDowngrade ? (
            <>
              <ArrowDown className="h-4 w-4 mr-2" />
              Downgrade
            </>
          ) : (
            "Select Plan"
          )}
        </Button>
      </div>
    </Card>
  );
}
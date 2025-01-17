import { ArrowUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plan, PlanCardProps } from "./types";
import { useTranslation } from "react-i18next";

export function PlanCard({ plan, isCurrentPlan, onSelect }: PlanCardProps) {
  const { t } = useTranslation();

  const renderFeatureValue = (key: string, value: any) => {
    if (typeof value === 'number') {
      return value === -1 ? t('profile.plan.unlimited') : value;
    }
    return value ? t('profile.plan.yes') : t('profile.plan.no');
  };

  return (
    <Card className={`p-6 relative ${isCurrentPlan ? 'border-2 border-primary' : ''}`}>
      {isCurrentPlan && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
            {t('profile.plan.current_plan')}
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-bold">{plan.name}</h3>
        <p className="text-sm text-muted-foreground">{plan.description}</p>
        <div className="mt-4 text-2xl font-bold text-primary">
          ${plan.price_monthly}
          <span className="text-sm font-normal text-muted-foreground">/month</span>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {Object.entries(plan.features).map(([key, value]) => (
          <div key={key} className="flex items-center gap-2">
            <span className="text-sm">
              {t(`profile.plan.features.${key}`)}: {renderFeatureValue(key, value)}
            </span>
          </div>
        ))}
      </div>

      {!isCurrentPlan && (
        <Button 
          className="w-full" 
          onClick={() => onSelect(plan)}
          variant={plan.price_monthly > 0 ? "default" : "outline"}
        >
          {plan.price_monthly > 0 && <ArrowUp className="h-4 w-4 mr-2" />}
          {plan.price_monthly > 0 ? t('profile.plan.upgrade') : t('profile.plan.select')}
        </Button>
      )}
      {isCurrentPlan && (
        <div className="text-center text-sm text-muted-foreground">
          {t('profile.plan.current_plan_message')}
        </div>
      )}
    </Card>
  );
}
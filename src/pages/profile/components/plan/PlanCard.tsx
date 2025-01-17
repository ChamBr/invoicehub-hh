import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Plan } from "./types";
import { PlanFeatures } from "@/i18n/types/translations";

interface PlanCardProps {
  plan: Plan;
  isCurrentPlan: boolean;
  onSelect: (plan: Plan) => void;
}

export function PlanCard({ plan, isCurrentPlan, onSelect }: PlanCardProps) {
  const { t } = useTranslation('profile');

  const formatFeatureValue = (key: keyof PlanFeatures, value: boolean | number) => {
    if (typeof value === 'boolean') {
      return value ? t('plan.yes') : t('plan.no');
    }
    if (value === -1) return t('plan.unlimited');
    return value;
  };

  const getActiveFeatures = () => {
    const features = typeof plan.features === 'string' 
      ? JSON.parse(plan.features) as PlanFeatures
      : plan.features as PlanFeatures;

    return Object.entries(features).filter(([_, value]) => {
      if (typeof value === 'boolean') return value;
      if (typeof value === 'number') return value > 0;
      return false;
    });
  };

  return (
    <Card className={`flex flex-col h-full p-6 relative ${isCurrentPlan ? 'border-2 border-primary' : ''}`}>
      {isCurrentPlan && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
            {t('plan.current_plan')}
          </span>
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-xl font-bold">{plan.name}</h3>
        <p className="text-sm text-muted-foreground">
          {t(`plan.descriptions.${plan.name.toLowerCase()}`)}
        </p>
        <div className="mt-2">
          <span className="text-2xl font-bold text-primary">${plan.price_monthly}</span>
          <span className="text-sm font-normal text-muted-foreground">/{t('plan.monthly')}</span>
        </div>
      </div>

      <div className="flex-grow space-y-2 mb-6">
        {getActiveFeatures().map(([key, value]) => (
          <div key={key} className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 text-primary flex-shrink-0" />
            <span>
              {t(`plan.features.${key}`)}: {formatFeatureValue(key as keyof PlanFeatures, value as boolean | number)}
            </span>
          </div>
        ))}
      </div>

      {!isCurrentPlan && (
        <div className="mt-auto">
          <Button 
            className="w-full" 
            onClick={() => onSelect(plan)}
            variant={plan.price_monthly > 0 ? "default" : "outline"}
          >
            {t('plan.upgrade')}
          </Button>
        </div>
      )}
    </Card>
  );
}
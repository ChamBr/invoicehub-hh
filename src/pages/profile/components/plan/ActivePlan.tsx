import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Plan } from "./types";

interface ActivePlanProps {
  plan: Plan;
}

export function ActivePlan({ plan }: ActivePlanProps) {
  const { t } = useTranslation('profile');

  const formatFeatureValue = (key: string, value: any) => {
    if (typeof value === 'boolean') {
      return value ? t('plan.yes') : t('plan.no');
    }
    if (value === -1) return t('plan.unlimited');
    return value;
  };

  const getActiveFeatures = () => {
    return Object.entries(plan.features).filter(([_, value]) => {
      if (typeof value === 'boolean') return value;
      return value > 0;
    });
  };

  return (
    <Card className="p-6 bg-white shadow-sm border-2 border-primary relative">
      <div className="absolute -top-3 left-6">
        <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
          {t('plan.current_plan')}
        </span>
      </div>

      <div className="flex justify-between items-start mb-4 mt-3">
        <div>
          <h2 className="text-2xl font-bold">{plan.name}</h2>
          <p className="text-muted-foreground">
            {t(`plan.descriptions.${plan.name.toLowerCase()}`)}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">
            ${plan.price_monthly}
            <span className="text-sm font-normal text-muted-foreground">/{t('plan.monthly')}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">{t('plan.features')}</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {getActiveFeatures().map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary flex-shrink-0" />
              <span>
                {t(`plan.features.${key}`)}: {formatFeatureValue(key, value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
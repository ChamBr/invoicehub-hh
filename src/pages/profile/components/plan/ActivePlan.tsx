import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Plan } from "./types";

interface ActivePlanProps {
  plan: Plan;
  nextBillingDate?: string;
}

export function ActivePlan({ plan, nextBillingDate }: ActivePlanProps) {
  const { t } = useTranslation();

  const renderFeatureValue = (key: string, value: any) => {
    if (typeof value === 'number') {
      return value === -1 ? t('profile.plan.unlimited') : value;
    }
    return value ? t('profile.plan.yes') : t('profile.plan.no');
  };

  return (
    <Card className="p-6 bg-white shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold">{plan.name}</h2>
          <p className="text-muted-foreground">{plan.description}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">
            ${plan.price_monthly}
            <span className="text-sm font-normal text-muted-foreground">/month</span>
          </div>
          {nextBillingDate && (
            <p className="text-sm text-muted-foreground">
              {t('profile.plan.next_billing')}: {nextBillingDate}
            </p>
          )}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">{t('profile.plan.included_features')}</h3>
        <div className="grid gap-3">
          {Object.entries(plan.features).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="text-sm">
                {t(`profile.plan.features.${key}`)}: {renderFeatureValue(key, value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
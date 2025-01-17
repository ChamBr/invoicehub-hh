import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Plan } from "./types";
import { format } from "date-fns";

interface ActivePlanProps {
  plan: Plan;
  nextBillingDate?: string;
}

export function ActivePlan({ plan, nextBillingDate }: ActivePlanProps) {
  const { t } = useTranslation();

  const formatFeatureValue = (key: string, value: any) => {
    if (typeof value === 'boolean') {
      return value ? t('profile.plan.yes') : t('profile.plan.no');
    }
    if (value === -1) return t('profile.plan.unlimited');
    return value;
  };

  const getActiveFeatures = () => {
    return Object.entries(plan.features).filter(([_, value]) => {
      if (typeof value === 'boolean') return value;
      return value > 0;
    });
  };

  return (
    <Card className="p-6 bg-white shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="inline-block bg-primary-light text-primary text-sm font-medium px-3 py-1 rounded-full mb-2">
            {t('profile.plan.current_plan')}
          </div>
          <h2 className="text-2xl font-bold">{plan.name}</h2>
          <p className="text-muted-foreground">
            {t(`profile.plan.descriptions.${plan.name.toLowerCase()}`)}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">
            ${plan.price_monthly}
            <span className="text-sm font-normal text-muted-foreground">/{t('profile.plan.monthly')}</span>
          </div>
          {nextBillingDate && (
            <p className="text-sm text-muted-foreground mt-1">
              {t('profile.plan.next_billing')}: {format(new Date(nextBillingDate), 'MM/dd/yyyy')}
            </p>
          )}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">{t('profile.plan.features')}</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {getActiveFeatures().map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary flex-shrink-0" />
              <span>
                {t(`profile.plan.features.${key}`)}: {formatFeatureValue(key, value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
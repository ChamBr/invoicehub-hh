import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Plan } from "./types";

interface ActivePlanProps {
  plan: Plan;
}

export function ActivePlan({ plan }: ActivePlanProps) {
  const { t } = useTranslation();

  return (
    <Card className="relative p-8 bg-white shadow-sm border-2 border-primary">
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
        <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
          {t('profile.plan.current_plan')}
        </span>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-4">
        <div>
          <h3 className="text-xl font-semibold">{plan.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {plan.description}
          </p>
        </div>
        <div className="text-2xl font-bold text-primary">
          ${plan.price_monthly}
          <span className="text-sm font-normal text-muted-foreground">/month</span>
        </div>
      </div>

      <div className="mt-6 border-t pt-6">
        <h4 className="font-medium mb-4">{t('profile.plan.features')}</h4>
        <ul className="grid gap-3">
          {Object.entries(plan.features).map(([key, value]) => (
            <li key={key} className="flex items-center gap-3">
              <Check className="h-4 w-4 text-primary shrink-0" />
              <span className="text-sm">
                {typeof value === 'boolean'
                  ? t(`profile.plan.features.${key}`)
                  : t(`profile.plan.features.${key}`, { value })}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
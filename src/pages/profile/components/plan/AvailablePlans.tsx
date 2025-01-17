import { useTranslation } from "react-i18next";
import { Plan } from "./types";
import { PlanCard } from "./PlanCard";

interface AvailablePlansProps {
  plans: Plan[] | undefined;
  currentPlan: Plan | undefined;
  onPlanChange: (plan: Plan) => Promise<void>;
}

export function AvailablePlans({ plans, currentPlan, onPlanChange }: AvailablePlansProps) {
  const { t } = useTranslation('profile');

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">{t('plan.available_plans')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans?.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isCurrentPlan={currentPlan?.id === plan.id}
            onSelect={onPlanChange}
          />
        ))}
      </div>
    </div>
  );
}
import { usePlanManagement } from "./components/plan/usePlanManagement";
import { ActivePlan } from "./components/plan/ActivePlan";
import { AvailablePlans } from "./components/plan/AvailablePlans";
import { LoadingState } from "./components/plan/LoadingState";
import { useTranslation } from "react-i18next";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const UserPlan = () => {
  const { t } = useTranslation('profile');
  const {
    plans,
    currentPlan,
    currentSubscription,
    isLoading,
    handlePlanChange,
  } = usePlanManagement();

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-8">
      {!currentPlan && (
        <Alert variant="default" className="bg-muted">
          <AlertDescription>
            {t('plan.no_plan_message')}
          </AlertDescription>
        </Alert>
      )}

      {currentPlan && (
        <ActivePlan 
          plan={currentPlan} 
          nextBillingDate={currentSubscription?.renewal_date}
        />
      )}

      <AvailablePlans
        plans={plans}
        currentPlan={currentPlan}
        onPlanChange={handlePlanChange}
      />
    </div>
  );
};

export default UserPlan;
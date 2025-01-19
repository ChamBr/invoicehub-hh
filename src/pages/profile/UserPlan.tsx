import { usePlanManagement } from "./components/plan/usePlanManagement";
import { ActivePlan } from "./components/plan/ActivePlan";
import { AvailablePlans } from "./components/plan/AvailablePlans";
import { LoadingState } from "./components/plan/LoadingState";
import { useTranslation } from "react-i18next";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLocation } from "react-router-dom";
import { AlertCircle } from "lucide-react";

export const UserPlan = () => {
  const { t } = useTranslation('profile');
  const location = useLocation();
  const requiresSubscription = location.state?.requiresSubscription;

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
      {requiresSubscription && !currentSubscription && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {t('plan.no_subscription')}
          </AlertDescription>
        </Alert>
      )}

      {currentPlan && (
        <ActivePlan 
          plan={currentPlan} 
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
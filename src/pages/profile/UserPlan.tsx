import { usePlanManagement } from "./components/plan/usePlanManagement";
import { ActivePlan } from "./components/plan/ActivePlan";
import { AvailablePlans } from "./components/plan/AvailablePlans";
import { LoadingState } from "./components/plan/LoadingState";

export const UserPlan = () => {
  const {
    plans,
    currentPlan,
    currentSubscription,
    isLoading,
    handlePlanChange,
  } = usePlanManagement();

  return (
    <div className="space-y-8">
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

      {isLoading && <LoadingState />}
    </div>
  );
};

export default UserPlan;
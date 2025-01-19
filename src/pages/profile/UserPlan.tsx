import { useLocation } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useTranslation } from "react-i18next";
import PlanSelection from "./components/plan/PlanSelection";

const UserPlan = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const requiresSubscription = location.state?.requiresSubscription;
  const fromPath = location.state?.from;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {requiresSubscription && (
        <Alert className="mb-6 bg-emerald-50 border-emerald-200">
          <AlertDescription className="text-emerald-800">
            {fromPath ? (
              t(
                'subscription.required.specific',
                'Para acessar {{path}}, você precisa selecionar um plano abaixo.',
                { path: fromPath }
              )
            ) : (
              t(
                'subscription.required.generic',
                'Para acessar recursos premium, selecione um plano abaixo.'
              )
            )}
          </AlertDescription>
        </Alert>
      )}
      
      <PlanSelection />
    </div>
  );
};

export default UserPlan;
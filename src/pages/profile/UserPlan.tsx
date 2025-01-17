import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PlanSelection } from "./components/plan/PlanSelection";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Plan } from "./components/plan/types";
import { NoPlanState } from "./components/plan/NoPlanState";
import { ActivePlan } from "./components/plan/ActivePlan";

export const UserPlan = () => {
  const { t } = useTranslation();
  const { session } = useAuth();
  const { toast } = useToast();
  const [showPlanSelection, setShowPlanSelection] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activePlan, setActivePlan] = useState<Plan | null>(null);

  const handlePlanChange = async (newPlan: Plan) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('subscriptions')
        .update({ plan_id: newPlan.id })
        .eq('user_id', session?.user?.id)
        .single();

      if (error) throw error;

      setActivePlan(newPlan);
      toast({
        title: t('profile.plan.change_success'),
        description: t('profile.plan.change_success_description'),
      });
    } catch (error) {
      console.error('Error changing plan:', error);
      toast({
        variant: "destructive",
        title: t('profile.plan.change_error'),
        description: t('profile.plan.change_error_description'),
      });
    } finally {
      setIsLoading(false);
      setShowPlanSelection(false);
    }
  };

  if (!activePlan) {
    return (
      <>
        <NoPlanState onSelectPlan={() => setShowPlanSelection(true)} />
        {showPlanSelection && (
          <div className="mt-8">
            <PlanSelection
              onClose={() => setShowPlanSelection(false)}
              onPlanSelected={handlePlanChange}
            />
          </div>
        )}
      </>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">{t('profile.plan.title')}</h2>
        <p className="text-muted-foreground">
          {t('profile.plan.description')}
        </p>
      </div>

      <ActivePlan plan={activePlan} />

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">{t('profile.plan.available_plans')}</h3>
        <PlanSelection
          currentPlan={activePlan}
          onPlanSelected={handlePlanChange}
          showUpgradeOnly={true}
        />
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      )}
    </div>
  );
};

export default UserPlan;
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PlanSelection } from "./components/plan/PlanSelection";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";

export const UserPlan = () => {
  const { t } = useTranslation();
  const { session } = useAuth();
  const { toast } = useToast();
  const [showPlanSelection, setShowPlanSelection] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activePlan, setActivePlan] = useState(null);

  const handlePlanChange = async (newPlan) => {
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

  if (!activePlan && !showPlanSelection) {
    return (
      <div className="space-y-6">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">{t('profile.plan.title')}</h2>
          <p className="text-muted-foreground">
            {t('profile.plan.description')}
          </p>
        </div>

        <Card className="p-8">
          <Alert className="mb-6 bg-accent border-primary/20">
            <AlertTitle className="text-lg font-semibold text-gray-900">
              {t('profile.plan.no_active_plan_title')}
            </AlertTitle>
            <AlertDescription className="text-gray-600">
              {t('profile.plan.no_active_plan_description')}
            </AlertDescription>
          </Alert>
          <Button
            onClick={() => setShowPlanSelection(true)}
            className="w-full md:w-auto"
          >
            {t('profile.plan.select_plan')}
          </Button>
        </Card>

        {showPlanSelection && (
          <div className="mt-8">
            <PlanSelection
              onClose={() => setShowPlanSelection(false)}
              onPlanSelected={handlePlanChange}
            />
          </div>
        )}
      </div>
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

      {activePlan && (
        <Card className="p-8 bg-white shadow-sm mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-lg font-semibold">{activePlan.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {activePlan.description}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowPlanSelection(true)}
              className="shrink-0"
            >
              {t('profile.plan.change_plan')}
            </Button>
          </div>

          <div className="mt-6 border-t pt-6">
            <h4 className="font-medium mb-4">{t('profile.plan.features')}</h4>
            <ul className="grid gap-3">
              {Object.entries(activePlan.features).map(([key, value]) => (
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

          {isLoading && (
            <div className="mt-6 border-t pt-6 flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          )}
        </Card>
      )}

      {showPlanSelection && (
        <div className="mt-8">
          <PlanSelection
            onClose={() => setShowPlanSelection(false)}
            onPlanSelected={handlePlanChange}
          />
        </div>
      )}
    </div>
  );
};

export default UserPlan;
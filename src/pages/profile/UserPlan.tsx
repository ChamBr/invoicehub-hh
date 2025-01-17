import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Plan } from "./components/plan/types";
import { ActivePlan } from "./components/plan/ActivePlan";
import { PlanCard } from "./components/plan/PlanCard";
import { useQuery } from "@tanstack/react-query";

export const UserPlan = () => {
  const { t } = useTranslation();
  const { session } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const { data: plans } = useQuery({
    queryKey: ["available-plans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("plans")
        .select("*")
        .eq("status", "active")
        .order("price_monthly", { ascending: true });

      if (error) throw error;
      return data as Plan[];
    },
  });

  const { data: currentSubscription } = useQuery({
    queryKey: ["current-subscription"],
    queryFn: async () => {
      if (!session?.user?.id) return null;

      const { data, error } = await supabase
        .from("subscriptions")
        .select(`
          *,
          plan:plans(*)
        `)
        .eq("user_id", session.user.id)
        .eq("status", "active")
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  const handlePlanChange = async (newPlan: Plan) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('subscriptions')
        .update({ plan_id: newPlan.id })
        .eq('user_id', session?.user?.id)
        .single();

      if (error) throw error;

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
    }
  };

  const currentPlan = currentSubscription?.plan as Plan | undefined;

  return (
    <div className="space-y-8">
      {currentPlan && (
        <ActivePlan 
          plan={currentPlan} 
          nextBillingDate={currentSubscription?.renewal_date}
        />
      )}

      <div>
        <h2 className="text-2xl font-bold mb-6">{t('profile.plan.available_plans')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans?.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isCurrentPlan={currentPlan?.id === plan.id}
              onSelect={handlePlanChange}
            />
          ))}
        </div>
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
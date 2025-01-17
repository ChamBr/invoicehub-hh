import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Plan, PlanFeatures } from "./types";
import { useQuery } from "@tanstack/react-query";

export function usePlanManagement() {
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
      
      return data?.map(plan => ({
        ...plan,
        features: plan.features as PlanFeatures
      })) as Plan[];
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

      if (data?.plan) {
        return {
          ...data,
          plan: {
            ...data.plan,
            features: data.plan.features as PlanFeatures
          }
        };
      }
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

  return {
    plans,
    currentSubscription,
    currentPlan: currentSubscription?.plan as Plan | undefined,
    isLoading,
    handlePlanChange,
  };
}
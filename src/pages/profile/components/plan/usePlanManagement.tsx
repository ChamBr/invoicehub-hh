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
        features: plan.features as unknown as PlanFeatures
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
        .eq("status", "active");

      if (error) {
        console.error("Error fetching subscription:", error);
        toast({
          variant: "destructive",
          title: t("errors.subscription_fetch_failed"),
          description: t("errors.please_try_again"),
        });
        throw error;
      }

      // Se não houver assinatura, retorna null
      if (!data || data.length === 0) {
        return null;
      }

      // Pega a primeira assinatura ativa
      const subscription = data[0];
      
      if (subscription?.plan) {
        return {
          ...subscription,
          plan: {
            ...subscription.plan,
            features: subscription.plan.features as unknown as PlanFeatures
          }
        };
      }
      
      return subscription;
    },
    enabled: !!session?.user?.id,
  });

  const handlePlanChange = async (newPlan: Plan) => {
    if (!session?.user?.id) {
      toast({
        variant: "destructive",
        title: t("errors.auth_required"),
        description: t("errors.login_required"),
      });
      return;
    }

    setIsLoading(true);
    try {
      // Verifica se já existe uma assinatura
      const { data: existingSubscription } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('status', 'active');

      if (existingSubscription && existingSubscription.length > 0) {
        // Atualiza a assinatura existente
        const { error } = await supabase
          .from('subscriptions')
          .update({ 
            plan_id: newPlan.id,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingSubscription[0].id);

        if (error) throw error;
      } else {
        // Cria uma nova assinatura
        const { error } = await supabase
          .from('subscriptions')
          .insert({
            user_id: session.user.id,
            plan_id: newPlan.id,
            status: 'active',
            billing_period: 'monthly',
            start_date: new Date().toISOString(),
          });

        if (error) throw error;
      }

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
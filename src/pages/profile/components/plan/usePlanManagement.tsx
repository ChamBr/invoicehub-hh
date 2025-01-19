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

  // Buscar a assinatura ativa do usuário
  const { data: currentSubscription } = useQuery({
    queryKey: ["current-subscription", session?.user?.id],
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

      if (error) {
        console.error("Error fetching subscription:", error);
        toast({
          variant: "destructive",
          title: t("errors.subscription_fetch_failed"),
          description: t("errors.please_try_again"),
        });
        throw error;
      }

      if (!data) return null;

      return {
        ...data,
        plan: data.plan ? {
          ...data.plan,
          features: data.plan.features as unknown as PlanFeatures
        } : null
      };
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
      // Primeiro, verificar se o usuário já tem um subscriber
      const { data: existingSubscriber, error: subscriberQueryError } = await supabase
        .from("subscribers")
        .select("*")
        .eq("owner_id", session.user.id)
        .maybeSingle();

      if (subscriberQueryError) throw subscriberQueryError;

      let subscriberId;

      if (!existingSubscriber) {
        // Criar um novo subscriber se não existir
        const { data: newSubscriber, error: createSubscriberError } = await supabase
          .from("subscribers")
          .insert({
            owner_id: session.user.id,
            status: "active",
            company_name: session.user.email?.split('@')[0] || 'My Company'
          })
          .select()
          .single();

        if (createSubscriberError) throw createSubscriberError;
        subscriberId = newSubscriber.id;
      } else {
        subscriberId = existingSubscriber.id;
      }

      // Verificar se já existe uma assinatura ativa
      const { data: existingSubscription } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("status", "active")
        .maybeSingle();

      if (existingSubscription) {
        // Atualizar assinatura existente
        const { error } = await supabase
          .from("subscriptions")
          .update({ 
            plan_id: newPlan.id,
            updated_at: new Date().toISOString()
          })
          .eq("id", existingSubscription.id);

        if (error) throw error;
      } else {
        // Criar nova assinatura
        const { error } = await supabase
          .from("subscriptions")
          .insert({
            user_id: session.user.id,
            plan_id: newPlan.id,
            status: "active",
            billing_period: "monthly",
            start_date: new Date().toISOString(),
          });

        if (error) throw error;
      }

      // Atualizar o subscriber com o plano selecionado
      const { error: updateSubscriberError } = await supabase
        .from("subscribers")
        .update({ plan_id: newPlan.id })
        .eq("id", subscriberId);

      if (updateSubscriberError) throw updateSubscriberError;

      toast({
        title: t("profile.plan.change_success"),
        description: t("profile.plan.change_success_description"),
      });
    } catch (error) {
      console.error("Error changing plan:", error);
      toast({
        variant: "destructive",
        title: t("profile.plan.change_error"),
        description: t("profile.plan.change_error_description"),
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
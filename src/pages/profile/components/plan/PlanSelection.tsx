import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Plan, PlanFeatures, PlanSelectionProps } from "./types";
import { PlanCard } from "./PlanCard";

export function PlanSelection({ 
  onClose, 
  onPlanSelected, 
  currentPlan,
  showUpgradeOnly 
}: PlanSelectionProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { session } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const { data: plans, isLoading: plansLoading } = useQuery({
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

  const handlePlanSelection = async (selectedPlan: Plan) => {
    try {
      if (!session?.user?.id) {
        toast({
          title: "Erro",
          description: "Você precisa estar logado para selecionar um plano",
          variant: "destructive",
        });
        return;
      }

      // Verificar se o usuário já tem um subscriber
      const { data: existingSubscriber, error: subscriberError } = await supabase
        .from("subscribers")
        .select("*")
        .eq("owner_id", session.user.id)
        .maybeSingle();

      if (subscriberError) throw subscriberError;

      let subscriberId;

      if (!existingSubscriber) {
        // Criar um novo subscriber se não existir
        const { data: newSubscriber, error: createError } = await supabase
          .from("subscribers")
          .insert({
            owner_id: session.user.id,
            status: "active",
            company_name: session.user.email?.split('@')[0] || 'My Company',
            plan_id: selectedPlan.id
          })
          .select()
          .single();

        if (createError) throw createError;
        subscriberId = newSubscriber.id;

        // Criar vínculo subscriber_user
        const { error: linkError } = await supabase
          .from("subscriber_users")
          .insert({
            subscriber_id: subscriberId,
            user_id: session.user.id,
            role: 'admin'
          });

        if (linkError) throw linkError;
      } else {
        subscriberId = existingSubscriber.id;
        
        // Atualizar o plano do subscriber existente
        const { error: updateError } = await supabase
          .from("subscribers")
          .update({ 
            plan_id: selectedPlan.id,
            updated_at: new Date().toISOString()
          })
          .eq("id", subscriberId);

        if (updateError) throw updateError;
      }

      toast({
        title: "Sucesso",
        description: "Seu plano foi atualizado com sucesso",
      });

      if (onPlanSelected) {
        await onPlanSelected(selectedPlan);
      }

      if (onClose) {
        onClose();
      }

    } catch (error) {
      console.error("Error selecting plan:", error);
      toast({
        title: "Erro",
        description: "Falha ao atualizar seu plano. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  if (plansLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {plans?.map((plan) => {
        const isCurrentPlan = currentPlan?.id === plan.id;

        if (showUpgradeOnly && !isCurrentPlan && plan.price_monthly <= (currentPlan?.price_monthly || 0)) {
          return null;
        }

        return (
          <PlanCard
            key={plan.id}
            plan={plan}
            isCurrentPlan={isCurrentPlan}
            onSelect={handlePlanSelection}
          />
        );
      })}
    </div>
  );
}
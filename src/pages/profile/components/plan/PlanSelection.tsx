import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Plan, PlanFeatures, PlanSelectionProps } from "./types";
import { PlanCard } from "./PlanCard";
import { useAuth } from "@/components/auth/AuthProvider";

export function PlanSelection({ 
  onClose, 
  onPlanSelected, 
  currentPlan,
  showUpgradeOnly 
}: PlanSelectionProps) {
  const { toast } = useToast();
  const { session } = useAuth();

  const { data: plans, isLoading } = useQuery({
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

      const { data: customer, error: customerError } = await supabase
        .from("customers")
        .insert({
          name: session.user.email,
          email: session.user.email,
        })
        .select()
        .single();

      if (customerError) throw customerError;

      const { error: subscriptionError } = await supabase
        .from("subscriptions")
        .upsert({
          user_id: session.user.id,
          customer_id: customer.id,
          plan_id: selectedPlan.id,
          status: "active",
          start_date: new Date().toISOString(),
          billing_period: "monthly",
          renewal_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        });

      if (subscriptionError) throw subscriptionError;

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

  if (isLoading) {
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
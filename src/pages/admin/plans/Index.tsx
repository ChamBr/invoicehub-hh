import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { PlansHeader } from "./components/PlansHeader";
import { PlanCard } from "./components/PlanCard";
import { EditPlanDialog } from "./components/EditPlanDialog";
import { Plan } from "@/pages/profile/components/plan/types";

export function PlansManagement() {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const { data: plans, isLoading } = useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("plans")
        .select("*")
        .order("price_monthly", { ascending: true });

      if (error) throw error;
      return data as Plan[];
    },
  });

  const { data: selectedPlan } = useQuery({
    queryKey: ["plan", selectedPlanId],
    queryFn: async () => {
      if (!selectedPlanId) return null;
      
      const { data, error } = await supabase
        .from("plans")
        .select("*")
        .eq("id", selectedPlanId)
        .single();

      if (error) throw error;
      return data as Plan;
    },
    enabled: !!selectedPlanId,
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <PlansHeader />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans?.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            formatCurrency={formatCurrency}
            onEdit={setSelectedPlanId}
          />
        ))}
      </div>

      <EditPlanDialog
        plan={selectedPlan}
        isOpen={!!selectedPlanId}
        onClose={() => setSelectedPlanId(null)}
      />
    </div>
  );
}

export default PlansManagement;
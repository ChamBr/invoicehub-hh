import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plan, PlanFeatures } from "@/pages/profile/components/plan/types";
import { PlansTable } from "./plans/components/PlansTable";

export const PlansManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: plans, isLoading } = useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("plans")
        .select("*")
        .order("price_monthly", { ascending: true });

      if (error) throw error;
      
      return data?.map(plan => ({
        ...plan,
        features: plan.features as unknown as PlanFeatures
      })) as Plan[];
    },
  });

  const updatePlanStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from("plans")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      toast({
        title: "Status do plano atualizado",
        description: "O status do plano foi atualizado com sucesso",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao atualizar status",
        description: "Houve um erro ao atualizar o status do plano",
        variant: "destructive",
      });
    },
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const handleStatusChange = (id: string, status: string) => {
    updatePlanStatus.mutate({ id, status });
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Plans Management</h2>
        <Button onClick={() => navigate("/admin/plans/new")}>
          <Plus className="h-4 w-4 mr-2" />
          New Plan
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <PlansTable
          plans={plans || []}
          onStatusChange={handleStatusChange}
          formatCurrency={formatCurrency}
        />
      )}
    </Card>
  );
};
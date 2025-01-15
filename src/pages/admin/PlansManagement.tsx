import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

export const PlansManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingPlan, setEditingPlan] = useState<any>(null);

  const { data: plans, isLoading } = useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("plans")
        .select("*")
        .order("price");

      if (error) throw error;
      return data;
    },
  });

  const createPlan = useMutation({
    mutationFn: async (planData: any) => {
      const { error } = await supabase
        .from("plans")
        .insert([planData]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      toast({
        title: "Plano criado",
        description: "O plano foi criado com sucesso.",
      });
      setEditingPlan(null);
    },
  });

  const updatePlan = useMutation({
    mutationFn: async (planData: any) => {
      const { error } = await supabase
        .from("plans")
        .update(planData)
        .eq("id", planData.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      toast({
        title: "Plano atualizado",
        description: "O plano foi atualizado com sucesso.",
      });
      setEditingPlan(null);
    },
  });

  const deletePlan = useMutation({
    mutationFn: async (planId: string) => {
      const { error } = await supabase
        .from("plans")
        .delete()
        .eq("id", planId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      toast({
        title: "Plano excluído",
        description: "O plano foi excluído com sucesso.",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Gerenciamento de Planos</h2>
        <Button
          onClick={() => setEditingPlan({ name: "", description: "", price: 0, billing_period: "monthly" })}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-5 w-5" />
          Novo Plano
        </Button>
      </div>

      {editingPlan && (
        <Card className="p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const planData = {
                name: formData.get("name"),
                description: formData.get("description"),
                price: Number(formData.get("price")),
                billing_period: formData.get("billing_period"),
                features: {},
              };

              if (editingPlan.id) {
                updatePlan.mutate({ ...planData, id: editingPlan.id });
              } else {
                createPlan.mutate(planData);
              }
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="name">Nome do Plano</Label>
              <Input
                id="name"
                name="name"
                defaultValue={editingPlan.name}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={editingPlan.description}
              />
            </div>

            <div>
              <Label htmlFor="price">Preço</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                defaultValue={editingPlan.price}
                required
              />
            </div>

            <div>
              <Label htmlFor="billing_period">Período de Cobrança</Label>
              <select
                id="billing_period"
                name="billing_period"
                className="w-full border border-gray-300 rounded-md p-2"
                defaultValue={editingPlan.billing_period}
                required
              >
                <option value="monthly">Mensal</option>
                <option value="yearly">Anual</option>
              </select>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingPlan(null)}
              >
                Cancelar
              </Button>
              <Button type="submit">
                {editingPlan.id ? "Atualizar" : "Criar"} Plano
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans?.map((plan) => (
          <Card key={plan.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="text-sm text-gray-600">{plan.description}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setEditingPlan(plan)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    if (window.confirm("Tem certeza que deseja excluir este plano?")) {
                      deletePlan.mutate(plan.id);
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="text-2xl font-bold mb-2">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(plan.price)}
              <span className="text-sm font-normal text-gray-600">
                /{plan.billing_period === "monthly" ? "mês" : "ano"}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
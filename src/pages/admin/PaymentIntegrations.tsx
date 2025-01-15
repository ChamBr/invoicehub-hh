import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

export const PaymentIntegrations = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingIntegration, setEditingIntegration] = useState<any>(null);

  const { data: integrations, isLoading } = useQuery({
    queryKey: ["payment-integrations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payment_integrations")
        .select("*");

      if (error) throw error;
      return data;
    },
  });

  const updateIntegration = useMutation({
    mutationFn: async ({ id, isEnabled }: { id: string; isEnabled: boolean }) => {
      const { error } = await supabase
        .from("payment_integrations")
        .update({ is_enabled: isEnabled })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payment-integrations"] });
      toast({
        title: "Integração atualizada",
        description: "A integração foi atualizada com sucesso.",
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
        <h2 className="text-xl font-semibold">Integrações de Pagamento</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations?.map((integration) => (
          <Card key={integration.id} className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold">{integration.name}</h3>
                <p className="text-sm text-gray-600">{integration.provider}</p>
              </div>
              <Switch
                checked={integration.is_enabled}
                onCheckedChange={(checked) =>
                  updateIntegration.mutate({
                    id: integration.id,
                    isEnabled: checked,
                  })
                }
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
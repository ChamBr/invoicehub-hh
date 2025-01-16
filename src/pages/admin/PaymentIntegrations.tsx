import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const PaymentIntegrations = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: integrations, isLoading } = useQuery({
    queryKey: ["payment-integrations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payment_integrations")
        .select("*")
        .order("name");

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
    onError: (error) => {
      console.error("Erro ao atualizar integração:", error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar integração",
        description: "Ocorreu um erro ao atualizar a integração.",
      });
    },
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-4 pt-4">
      {integrations?.map((integration) => (
        <div key={integration.id} className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">{integration.name}</h3>
            <p className="text-sm text-gray-500">{integration.provider}</p>
          </div>
          <Switch
            checked={integration.is_enabled}
            onCheckedChange={(checked) =>
              updateIntegration.mutate({ id: integration.id, isEnabled: checked })
            }
          />
        </div>
      ))}
    </div>
  );
};
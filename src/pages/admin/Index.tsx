import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { PlansManagement } from "./PlansManagement";
import { PaymentIntegrations } from "./PaymentIntegrations";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AdminIndex = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Verificar autenticação e perfil admin
  const { data: profile, isLoading: isLoadingProfile, error: profileError } = useQuery({
    queryKey: ["admin-profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  // Buscar configurações do sistema
  const { data: settings, isLoading: isLoadingSettings, error: settingsError } = useQuery({
    queryKey: ["system-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("system_settings")
        .select("*");

      if (error) throw error;
      return data;
    },
    enabled: profile?.role === "admin", // Só busca se for admin
  });

  // Mutation para atualizar configurações
  const updateSetting = useMutation({
    mutationFn: async ({ featureKey, isEnabled }: { featureKey: string; isEnabled: boolean }) => {
      const { error } = await supabase
        .from("system_settings")
        .update({ is_enabled: isEnabled })
        .eq("feature_key", featureKey);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["system-settings"] });
      toast({
        title: "Configuração atualizada",
        description: "A configuração foi atualizada com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar configuração",
        description: "Ocorreu um erro ao atualizar a configuração.",
      });
      console.error("Error:", error);
    },
  });

  useEffect(() => {
    document.title = "InvoiceHub - Administração";
  }, []);

  // Loading state
  if (isLoadingProfile || (profile?.role === "admin" && isLoadingSettings)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Error state
  if (profileError || settingsError) {
    return (
      <div className="p-8">
        <Alert variant="destructive">
          <AlertDescription>
            Ocorreu um erro ao carregar a página de administração. Por favor, tente novamente.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Redirecionar se não for admin
  if (!profile || profile.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Administração</h1>

        <Tabs defaultValue="features" className="space-y-6">
          <TabsList>
            <TabsTrigger value="features">Recursos</TabsTrigger>
            <TabsTrigger value="plans">Planos</TabsTrigger>
            <TabsTrigger value="payments">Integrações de Pagamento</TabsTrigger>
          </TabsList>

          <TabsContent value="features">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Recursos do Sistema</h2>
              <div className="space-y-4">
                {settings?.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between">
                    <Label htmlFor={setting.feature_key} className="flex-1">
                      {setting.feature_key === "address_autocomplete" 
                        ? "Autocompletar Endereço" 
                        : setting.feature_key}
                    </Label>
                    <Switch
                      id={setting.feature_key}
                      checked={setting.is_enabled}
                      onCheckedChange={(checked) => 
                        updateSetting.mutate({
                          featureKey: setting.feature_key,
                          isEnabled: checked,
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="plans">
            <PlansManagement />
          </TabsContent>

          <TabsContent value="payments">
            <PaymentIntegrations />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminIndex;
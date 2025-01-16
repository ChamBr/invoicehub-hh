import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navigate, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Users, CreditCard, Settings, BarChart, Flag } from "lucide-react";
import DebugModeSwitch from "@/components/admin/DebugModeSwitch";
import { PlansManagement } from "./PlansManagement";
import { PaymentIntegrations } from "./PaymentIntegrations";

const AdminIndex = () => {
  const navigate = useNavigate();

  const { data: profile, isLoading: isLoadingProfile, error: profileError } = useQuery({
    queryKey: ["admin-profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("Usuário não autenticado");
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Erro ao buscar perfil:", error);
        throw error;
      }

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

      if (error) {
        console.error("Erro ao buscar configurações:", error);
        throw error;
      }

      return data;
    },
    enabled: profile?.role === "admin",
  });

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 h-24 text-lg"
            onClick={() => navigate("/customers")}
          >
            <Users className="h-6 w-6" />
            Clientes
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2 h-24 text-lg"
            onClick={() => navigate("/plans")}
          >
            <CreditCard className="h-6 w-6" />
            Planos
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2 h-24 text-lg"
            onClick={() => navigate("/reports")}
          >
            <BarChart className="h-6 w-6" />
            Relatórios
          </Button>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configurações do Sistema
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="features">
                <AccordionTrigger>
                  <span className="flex items-center gap-2">
                    <Flag className="h-4 w-4" />
                    Flags do Sistema
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-4">
                    {settings?.map((setting) => (
                      <div key={setting.id} className="flex items-center justify-between">
                        <label htmlFor={setting.feature_key} className="flex-1">
                          {setting.feature_key === "address_autocomplete" 
                            ? "Autocompletar Endereço" 
                            : setting.feature_key}
                        </label>
                        <DebugModeSwitch />
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="integrations">
                <AccordionTrigger>Integrações de Pagamento</AccordionTrigger>
                <AccordionContent>
                  <PaymentIntegrations />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="plans">
                <AccordionTrigger>Gerenciamento de Planos</AccordionTrigger>
                <AccordionContent>
                  <PlansManagement />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminIndex;
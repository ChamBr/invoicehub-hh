import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FilePlus, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const AdminPlans = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gerenciamento de Planos</h1>
          <Button 
            onClick={() => navigate("/admin/plans/new")}
            className="flex items-center gap-2"
          >
            <FilePlus className="h-5 w-5" />
            Novo Plano
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans?.map((plan) => (
            <Card key={plan.id} className="relative">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{plan.name}</span>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate(`/admin/plans/${plan.id}/edit`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        toast({
                          title: "Em breve",
                          description: "Funcionalidade em desenvolvimento",
                        });
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-3xl font-bold">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(plan.price)}
                    <span className="text-sm font-normal text-gray-600">
                      /{plan.billing_period === "monthly" ? "mês" : "ano"}
                    </span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                  {plan.features && (
                    <div className="space-y-2">
                      {Object.entries(plan.features as Record<string, boolean>).map(
                        ([feature, included]) => (
                          <div
                            key={feature}
                            className={`flex items-center ${
                              included ? "text-green-600" : "text-gray-400"
                            }`}
                          >
                            <span className="mr-2">•</span>
                            {feature}
                          </div>
                        )
                      )}
                    </div>
                  )}
                  <div className="pt-4">
                    <p className="text-sm text-gray-500">
                      Status: {plan.status === "active" ? "Ativo" : "Inativo"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPlans;
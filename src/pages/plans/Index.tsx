import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, PlusCircle } from "lucide-react";

const PlansIndex = () => {
  const [pageTitle, setPageTitle] = useState("InvoiceHub - Planos");

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

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
          <h1 className="text-2xl font-bold">Planos</h1>
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            Novo Plano
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans?.map((plan) => (
            <Card key={plan.id} className="p-6 flex flex-col">
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <div className="text-3xl font-bold mb-4">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(plan.price)}
                <span className="text-sm font-normal text-gray-600">
                  /{plan.billing_period === "monthly" ? "mês" : "ano"}
                </span>
              </div>
              <div className="flex-grow">
                {plan.features &&
                  Object.entries(plan.features as Record<string, boolean>).map(
                    ([feature, included]) => (
                      <div key={feature} className="flex items-center text-sm mb-2">
                        <Check
                          className={`mr-2 h-4 w-4 ${
                            included ? "text-green-500" : "text-red-500"
                          }`}
                        />
                        {feature}
                      </div>
                    )
                  )}
              </div>
              <Button className="w-full mt-4">Selecionar Plano</Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlansIndex;
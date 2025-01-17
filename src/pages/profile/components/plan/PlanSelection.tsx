import { useQuery } from "@tanstack/react-query";
import { Check, ArrowUp, ArrowDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface Plan {
  id: string;
  name: string;
  description: string;
  price_monthly: number;
  price_semiannual: number;
  price_annual: number;
  discount_semiannual: number;
  discount_annual: number;
  features: {
    max_users: number;
    max_invoices: number;
    max_products: number;
    max_customers: number;
    logo_replace: boolean;
    invoice_templates: boolean;
    ai_translations: boolean;
    disk_space: number;
  };
  status: string;
}

export function PlanSelection() {
  const { toast } = useToast();

  const { data: plans, isLoading } = useQuery({
    queryKey: ["available-plans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("plans")
        .select("*")
        .eq("status", "active")
        .order("price_monthly", { ascending: true });

      if (error) throw error;
      return data as Plan[];
    },
  });

  const { data: currentSubscription } = useQuery({
    queryKey: ["current-subscription"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data: customer } = await supabase
        .from("customers")
        .select("id")
        .eq("email", user.email)
        .maybeSingle();

      if (!customer) return null;

      const { data, error } = await supabase
        .from("subscriptions")
        .select(`
          *,
          plan:plans(*)
        `)
        .eq("customer_id", customer.id)
        .eq("status", "active")
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });

  const handlePlanSelection = async (selectedPlan: Plan) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to select a plan",
          variant: "destructive",
        });
        return;
      }

      // Verificar se o usuário já tem uma assinatura
      const { data: customer } = await supabase
        .from("customers")
        .select("id")
        .eq("email", user.email)
        .maybeSingle();

      if (!customer) {
        toast({
          title: "Error",
          description: "Customer not found",
          variant: "destructive",
        });
        return;
      }

      // Atualizar ou criar nova assinatura
      const { error: subscriptionError } = await supabase
        .from("subscriptions")
        .upsert({
          customer_id: customer.id,
          plan_id: selectedPlan.id,
          status: "active",
          start_date: new Date().toISOString(),
          billing_period: "monthly", // Padrão inicial
          renewal_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        });

      if (subscriptionError) throw subscriptionError;

      toast({
        title: "Success",
        description: "Your plan has been updated successfully",
      });

    } catch (error) {
      console.error("Error selecting plan:", error);
      toast({
        title: "Error",
        description: "Failed to update your plan. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const renderFeatureValue = (key: string, value: any) => {
    if (key === "disk_space") {
      return value === -1 ? "Unlimited" : `${value}GB`;
    }
    if (key.startsWith("max_")) {
      return value === -1 ? "Unlimited" : value;
    }
    return value ? "Yes" : "No";
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans?.map((plan) => {
          const isCurrentPlan = currentSubscription?.plan_id === plan.id;
          const isUpgrade = currentSubscription && 
            plan.price_monthly > (currentSubscription?.plan?.price_monthly || 0);
          const isDowngrade = currentSubscription && 
            plan.price_monthly < (currentSubscription?.plan?.price_monthly || 0);

          return (
            <Card 
              key={plan.id} 
              className={`p-6 relative ${
                isCurrentPlan ? "border-2 border-primary" : ""
              }`}
            >
              {isCurrentPlan && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm">
                  Current Plan
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <p className="text-sm text-gray-500">{plan.description}</p>
                </div>

                <div className="text-3xl font-bold text-primary">
                  {formatCurrency(plan.price_monthly)}
                  <span className="text-sm font-normal text-gray-500">/month</span>
                </div>

                <div className="space-y-2">
                  {Object.entries(plan.features).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">
                        {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}: {" "}
                        {renderFeatureValue(key, value)}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full"
                  variant={isCurrentPlan ? "outline" : "default"}
                  onClick={() => handlePlanSelection(plan)}
                  disabled={isCurrentPlan}
                >
                  {isCurrentPlan ? (
                    "Current Plan"
                  ) : isUpgrade ? (
                    <>
                      <ArrowUp className="h-4 w-4 mr-2" />
                      Upgrade
                    </>
                  ) : isDowngrade ? (
                    <>
                      <ArrowDown className="h-4 w-4 mr-2" />
                      Downgrade
                    </>
                  ) : (
                    "Select Plan"
                  )}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
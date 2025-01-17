import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Plan } from "./types";
import { PlanCard } from "./PlanCard";

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
      return data as unknown as Plan[];
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

      const { data: existingCustomer } = await supabase
        .from("customers")
        .select("id")
        .eq("email", user.email)
        .maybeSingle();

      let customerId;
      if (existingCustomer) {
        customerId = existingCustomer.id;
      } else {
        const { data: newCustomer, error: createError } = await supabase
          .from("customers")
          .insert({
            email: user.email,
            name: user.user_metadata?.full_name || user.email,
          })
          .select()
          .single();

        if (createError) throw createError;
        customerId = newCustomer.id;
      }

      const { error: subscriptionError } = await supabase
        .from("subscriptions")
        .upsert({
          customer_id: customerId,
          plan_id: selectedPlan.id,
          status: "active",
          start_date: new Date().toISOString(),
          billing_period: "monthly",
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {plans?.map((plan) => {
        const isCurrentPlan = currentSubscription?.plan_id === plan.id;
        const isUpgrade = currentSubscription && 
          plan.price_monthly > (currentSubscription?.plan?.price_monthly || 0);
        const isDowngrade = currentSubscription && 
          plan.price_monthly < (currentSubscription?.plan?.price_monthly || 0);

        return (
          <PlanCard
            key={plan.id}
            plan={plan}
            isCurrentPlan={isCurrentPlan}
            isUpgrade={isUpgrade}
            isDowngrade={isDowngrade}
            onSelect={handlePlanSelection}
          />
        );
      })}
    </div>
  );
}
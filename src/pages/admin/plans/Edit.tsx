import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { PlanForm } from "./components/PlanForm";

export const EditPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: plan, isLoading } = useQuery({
    queryKey: ["plan", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("plans")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      // Ensure status is correctly typed
      return {
        ...data,
        status: data.status === "active" ? "active" : "inactive"
      };
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const defaultValues = plan ? {
    name: plan.name,
    description: plan.description || "",
    price_monthly: plan.price_monthly || 0,
    price_annual: plan.price_annual || 0,
    discount_annual: plan.discount_annual || 0,
    features: plan.features || {
      max_users: 1,
      max_invoices_per_month: 10,
      max_products: 10,
      max_customers: 10,
      logo_replace: false,
      invoice_templates: false,
      ai_assistance: false,
      storage_gb: 1
    },
    status: plan.status as "active" | "inactive"
  } : undefined;

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Edit Plan</h1>
      <Card className="p-6">
        <PlanForm
          planId={id}
          defaultValues={defaultValues}
          onSuccess={() => navigate("/admin/plans")}
          onCancel={() => navigate("/admin/plans")}
        />
      </Card>
    </div>
  );
};
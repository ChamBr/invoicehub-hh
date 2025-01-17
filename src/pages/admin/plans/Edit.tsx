import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { PlanForm } from "./components/PlanForm";
import { Json } from "@/integrations/supabase/types";

interface PlanFeatures {
  max_users: number;
  max_invoices_per_month: number;
  max_products: number;
  max_customers: number;
  logo_replace: boolean;
  invoice_templates: boolean;
  ai_assistance: boolean;
  storage_gb: number;
}

const parseFeatures = (features: Json | null): PlanFeatures => {
  const defaultFeatures: PlanFeatures = {
    max_users: 1,
    max_invoices_per_month: 10,
    max_products: 10,
    max_customers: 10,
    logo_replace: false,
    invoice_templates: false,
    ai_assistance: false,
    storage_gb: 1
  };

  if (!features || typeof features !== 'object' || Array.isArray(features)) {
    return defaultFeatures;
  }

  const featuresObj = features as Record<string, Json>;

  return {
    max_users: typeof featuresObj.max_users === 'number' ? featuresObj.max_users : defaultFeatures.max_users,
    max_invoices_per_month: typeof featuresObj.max_invoices_per_month === 'number' ? featuresObj.max_invoices_per_month : defaultFeatures.max_invoices_per_month,
    max_products: typeof featuresObj.max_products === 'number' ? featuresObj.max_products : defaultFeatures.max_products,
    max_customers: typeof featuresObj.max_customers === 'number' ? featuresObj.max_customers : defaultFeatures.max_customers,
    logo_replace: typeof featuresObj.logo_replace === 'boolean' ? featuresObj.logo_replace : defaultFeatures.logo_replace,
    invoice_templates: typeof featuresObj.invoice_templates === 'boolean' ? featuresObj.invoice_templates : defaultFeatures.invoice_templates,
    ai_assistance: typeof featuresObj.ai_assistance === 'boolean' ? featuresObj.ai_assistance : defaultFeatures.ai_assistance,
    storage_gb: typeof featuresObj.storage_gb === 'number' ? featuresObj.storage_gb : defaultFeatures.storage_gb
  };
};

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

      return {
        ...data,
        status: data.status === "active" ? "active" : "inactive",
        features: parseFeatures(data.features)
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
    features: plan.features as PlanFeatures,
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
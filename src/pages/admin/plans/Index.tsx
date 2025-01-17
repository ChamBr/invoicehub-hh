import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { PlanForm } from "./components/PlanForm";
import { Badge } from "@/components/ui/badge";

export function PlansManagement() {
  const navigate = useNavigate();
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const { data: plans, isLoading } = useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("plans")
        .select("*")
        .order("price_monthly", { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  const { data: selectedPlan } = useQuery({
    queryKey: ["plan", selectedPlanId],
    queryFn: async () => {
      if (!selectedPlanId) return null;
      
      const { data, error } = await supabase
        .from("plans")
        .select("*")
        .eq("id", selectedPlanId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!selectedPlanId,
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const formatFeature = (value: number | boolean) => {
    if (typeof value === 'boolean') return value ? "Yes" : "No";
    if (value === -1) return "Unlimited";
    if (typeof value === 'number' && value < 1) return `${value * 1000}MB`;
    return value;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Plans Management</h1>
        <Button onClick={() => navigate("/admin/plans/new")}>
          <PlusIcon className="w-4 h-4 mr-2" />
          New Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans?.map((plan) => {
          const features = typeof plan.features === 'string' 
            ? JSON.parse(plan.features) 
            : plan.features;

          return (
            <Card key={plan.id} className={`p-6 ${plan.status === 'inactive' ? 'opacity-60' : ''}`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                    {plan.status === 'inactive' && (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{plan.description}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedPlanId(plan.id)}
                >
                  Edit
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-2xl font-bold">
                    {formatCurrency(plan.price_monthly)}
                    <span className="text-sm font-normal text-gray-500">/month</span>
                  </p>
                  {plan.price_annual > 0 && (
                    <p className="text-sm text-gray-500">
                      {formatCurrency(plan.price_annual)}/year ({plan.discount_annual}% off)
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Features:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>Users: {formatFeature(features.max_users)}</li>
                    <li>Invoices per month: {formatFeature(features.max_invoices)}</li>
                    <li>Products: {formatFeature(features.max_products)}</li>
                    <li>Customers: {formatFeature(features.max_customers)}</li>
                    <li>Storage: {formatFeature(features.storage_gb)} GB</li>
                    <li>Logo Replacement: {formatFeature(features.logo_replace)}</li>
                    <li>Custom Templates: {formatFeature(features.invoice_templates)}</li>
                    <li>Translations: {formatFeature(features.translations)}</li>
                  </ul>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Dialog open={!!selectedPlanId} onOpenChange={() => setSelectedPlanId(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Plan</DialogTitle>
          </DialogHeader>
          {selectedPlan && (
            <PlanForm 
              planId={selectedPlanId} 
              defaultValues={{
                name: selectedPlan.name,
                description: selectedPlan.description || "",
                price_monthly: selectedPlan.price_monthly || 0,
                price_annual: selectedPlan.price_annual || 0,
                discount_annual: selectedPlan.discount_annual || 0,
                features: selectedPlan.features,
                status: selectedPlan.status as "active" | "inactive"
              }}
              onSuccess={() => setSelectedPlanId(null)}
              onCancel={() => setSelectedPlanId(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PlansManagement;
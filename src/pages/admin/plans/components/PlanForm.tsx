import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { PlanPricingFields } from "./PlanPricingFields";
import { PlanFeaturesField } from "./PlanFeaturesField";

interface PlanFormData {
  name: string;
  description: string;
  price_monthly: number;
  price_semiannual: number;
  price_annual: number;
  discount_semiannual: number;
  discount_annual: number;
  status: "active" | "inactive";
  features: Record<string, boolean>;
}

export const PlanForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<PlanFormData>({
    defaultValues: {
      status: "active",
      discount_semiannual: 0,
      discount_annual: 0,
      features: {},
    },
  });

  const { watch, setValue } = form;

  // Watch price changes to auto-calculate discounted prices
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "price_monthly") {
        const monthlyPrice = Number(value.price_monthly) || 0;
        const semiAnnualDiscount = Number(value.discount_semiannual) || 0;
        const annualDiscount = Number(value.discount_annual) || 0;

        // Calculate semiannual price with discount
        const semiAnnualPrice = monthlyPrice * 6 * (1 - semiAnnualDiscount / 100);
        setValue("price_semiannual", Number(semiAnnualPrice.toFixed(2)));

        // Calculate annual price with discount
        const annualPrice = monthlyPrice * 12 * (1 - annualDiscount / 100);
        setValue("price_annual", Number(annualPrice.toFixed(2)));
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  const onSubmit = async (data: PlanFormData) => {
    try {
      const { error } = await supabase.from("plans").insert([
        {
          name: data.name,
          description: data.description,
          price_monthly: data.price_monthly,
          price_semiannual: data.price_semiannual,
          price_annual: data.price_annual,
          discount_semiannual: data.discount_semiannual,
          discount_annual: data.discount_annual,
          status: data.status,
          features: data.features,
          billing_period: "monthly", // Default billing period
          price: data.price_monthly, // Use monthly price as base price
        },
      ]);

      if (error) throw error;

      toast({
        title: "Plano criado com sucesso!",
        description: "O novo plano foi adicionado ao sistema.",
      });

      navigate("/admin/plans");
    } catch (error) {
      console.error("Error creating plan:", error);
      toast({
        variant: "destructive",
        title: "Erro ao criar plano",
        description: "Ocorreu um erro ao tentar criar o plano. Por favor, tente novamente.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <PlanPricingFields control={form.control} />
        <PlanFeaturesField control={form.control} />
        
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/admin/plans")}
          >
            Cancelar
          </Button>
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </Form>
  );
};

export default PlanForm;
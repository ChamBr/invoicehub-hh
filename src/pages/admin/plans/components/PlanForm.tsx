import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { FormSection } from "@/components/forms/FormSection";
import { FormActions } from "@/components/forms/FormActions";
import { PlanBasicFields } from "./form/PlanBasicFields";
import { PlanPricingFields } from "./form/PlanPricingFields";
import { PlanFeaturesFields } from "./form/PlanFeaturesFields";

const planFeaturesSchema = z.object({
  max_users: z.number().min(-1),
  max_invoices_per_month: z.number().min(-1),
  max_products: z.number().min(-1),
  max_customers: z.number().min(-1),
  logo_replace: z.boolean(),
  invoice_templates: z.boolean(),
  ai_assistance: z.boolean(),
  storage_gb: z.number().min(-1)
});

const planFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().optional(),
  price_monthly: z.number().min(0, "Preço deve ser positivo"),
  price_annual: z.number().min(0, "Preço anual deve ser positivo"),
  discount_annual: z.number().min(0, "Desconto deve ser positivo").max(100, "Desconto não pode exceder 100%"),
  features: planFeaturesSchema,
  status: z.enum(["active", "inactive"])
});

type PlanFormValues = z.infer<typeof planFormSchema>;

interface PlanFormProps {
  planId?: string;
  onSuccess: () => void;
  onCancel: () => void;
  defaultValues?: Partial<PlanFormValues>;
}

export function PlanForm({ planId, onSuccess, onCancel, defaultValues }: PlanFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<PlanFormValues>({
    resolver: zodResolver(planFormSchema),
    defaultValues: defaultValues || {
      name: "",
      description: "",
      price_monthly: 0,
      price_annual: 0,
      discount_annual: 0,
      status: "active",
      features: {
        max_users: 1,
        max_invoices_per_month: 10,
        max_products: 10,
        max_customers: 10,
        logo_replace: false,
        invoice_templates: false,
        ai_assistance: false,
        storage_gb: 1
      }
    }
  });

  const mutation = useMutation({
    mutationFn: async (values: PlanFormValues) => {
      const planData = {
        name: values.name,
        description: values.description,
        price_monthly: values.price_monthly,
        price: values.price_monthly,
        price_annual: values.price_annual,
        discount_annual: values.discount_annual,
        features: values.features,
        status: values.status,
        billing_period: "monthly"
      };

      if (planId) {
        const { error } = await supabase
          .from("plans")
          .update(planData)
          .eq("id", planId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("plans")
          .insert([planData]);

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      toast({
        title: planId ? "Plano atualizado com sucesso" : "Plano criado com sucesso",
      });
      onSuccess();
    },
    onError: (error) => {
      console.error("Erro ao salvar plano:", error);
      toast({
        title: "Erro ao salvar plano",
        description: "Por favor, tente novamente",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: PlanFormValues) => {
    mutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="space-y-3">
          <FormSection>
            <PlanBasicFields control={form.control} />
          </FormSection>

          <FormSection>
            <PlanPricingFields control={form.control} />
          </FormSection>

          <FormSection>
            <PlanFeaturesFields control={form.control} />
          </FormSection>
        </div>

        <FormActions
          onCancel={onCancel}
          isSubmitting={mutation.isPending}
          submitLabel={planId ? "Salvar Alterações" : "Criar Plano"}
        />
      </form>
    </Form>
  );
}

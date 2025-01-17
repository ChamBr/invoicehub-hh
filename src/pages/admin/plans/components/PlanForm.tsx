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
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price_monthly: z.number().min(0, "Price must be positive"),
  price_annual: z.number().min(0, "Annual price must be positive"),
  discount_annual: z.number().min(0, "Discount must be positive").max(100, "Discount cannot exceed 100%"),
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
        price: values.price_monthly, // Using monthly price as base price
        price_annual: values.price_annual,
        discount_annual: values.discount_annual,
        features: values.features,
        status: values.status,
        billing_period: "monthly" // Adding required field
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
        title: planId ? "Plan updated successfully" : "Plan created successfully",
      });
      onSuccess();
    },
    onError: (error) => {
      console.error("Error saving plan:", error);
      toast({
        title: "Error saving plan",
        description: "Please try again",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: PlanFormValues) => {
    mutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormSection title="Basic Information">
          <PlanBasicFields control={form.control} />
        </FormSection>

        <FormSection title="Pricing">
          <PlanPricingFields control={form.control} />
        </FormSection>

        <FormSection title="Features">
          <PlanFeaturesFields control={form.control} />
        </FormSection>

        <FormActions
          onCancel={onCancel}
          isSubmitting={mutation.isPending}
          submitLabel={planId ? "Save Changes" : "Create Plan"}
        />
      </form>
    </Form>
  );
}
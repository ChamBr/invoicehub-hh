import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { FormRow } from "@/components/forms/FormRow";
import { FormSection } from "@/components/forms/FormSection";
import { FormActions } from "@/components/forms/FormActions";

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
}

export function PlanForm({ planId, onSuccess, onCancel }: PlanFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<PlanFormValues>({
    resolver: zodResolver(planFormSchema),
    defaultValues: {
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

  const { isLoading: isLoadingPlan } = useQuery({
    queryKey: ["plan", planId],
    queryFn: async () => {
      if (!planId) return null;
      
      const { data, error } = await supabase
        .from("plans")
        .select("*")
        .eq("id", planId)
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        const features = typeof data.features === 'string' 
          ? JSON.parse(data.features) 
          : data.features;

        form.reset({
          name: data.name,
          description: data.description || "",
          price_monthly: data.price_monthly || 0,
          price_annual: data.price_annual || 0,
          discount_annual: data.discount_annual || 0,
          status: data.status as "active" | "inactive",
          features: {
            max_users: features.max_users || 1,
            max_invoices_per_month: features.max_invoices_per_month || 10,
            max_products: features.max_products || 10,
            max_customers: features.max_customers || 10,
            logo_replace: features.logo_replace || false,
            invoice_templates: features.invoice_templates || false,
            ai_assistance: features.ai_assistance || false,
            storage_gb: features.storage_gb || 1
          }
        });
      }
      
      return data;
    },
    enabled: !!planId
  });

  const mutation = useMutation({
    mutationFn: async (values: PlanFormValues) => {
      const planData = {
        name: values.name,
        description: values.description,
        price_monthly: values.price_monthly,
        price_annual: values.price_annual,
        discount_annual: values.discount_annual,
        features: values.features,
        billing_period: "monthly",
        price: values.price_monthly,
        status: values.status
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

  if (isLoadingPlan) {
    return <div>Loading...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormSection title="Basic Information">
          <FormRow>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Active</FormLabel>
                    <FormDescription>
                      Enable or disable this plan
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value === "active"}
                      onCheckedChange={(checked) => 
                        field.onChange(checked ? "active" : "inactive")
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </FormRow>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </FormSection>

        <FormSection title="Pricing">
          <FormRow>
            <FormField
              control={form.control}
              name="price_monthly"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Price (USD)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01" 
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price_annual"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual Price (USD)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01" 
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discount_annual"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual Discount (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0" 
                      max="100" 
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </FormRow>
        </FormSection>

        <FormSection title="Features">
          <FormRow>
            <FormField
              control={form.control}
              name="features.max_users"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Users</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Set to -1 for unlimited</FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="features.max_invoices_per_month"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Invoices per Month</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Set to -1 for unlimited</FormDescription>
                </FormItem>
              )}
            />
          </FormRow>

          <FormRow>
            <FormField
              control={form.control}
              name="features.max_products"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Products</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Set to -1 for unlimited</FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="features.max_customers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Customers</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Set to -1 for unlimited</FormDescription>
                </FormItem>
              )}
            />
          </FormRow>

          <FormRow>
            <FormField
              control={form.control}
              name="features.storage_gb"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Storage (GB)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Set to -1 for unlimited</FormDescription>
                </FormItem>
              )}
            />
          </FormRow>

          <FormRow>
            <FormField
              control={form.control}
              name="features.logo_replace"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Logo Replacement</FormLabel>
                    <FormDescription>
                      Allow changing invoice logo
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="features.invoice_templates"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Invoice Templates</FormLabel>
                    <FormDescription>
                      Access to custom invoice templates
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </FormRow>

          <FormRow>
            <FormField
              control={form.control}
              name="features.ai_assistance"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">AI Assistance</FormLabel>
                    <FormDescription>
                      AI-powered text and translation features
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </FormRow>
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
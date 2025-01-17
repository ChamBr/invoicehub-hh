import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const planFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price_monthly: z.number().min(0, "Price must be positive"),
  price_annual: z.number().min(0, "Annual price must be positive"),
  discount_annual: z.number().min(0, "Discount must be positive").max(100, "Discount cannot exceed 100%"),
  features: z.object({
    max_users: z.number(),
    storage: z.number(),
    max_projects: z.number()
  })
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
      features: {
        max_users: 0,
        storage: 0,
        max_projects: 0
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
        .single();

      if (error) throw error;
      
      if (data) {
        form.reset(data);
      }
      
      return data;
    },
    enabled: !!planId
  });

  const mutation = useMutation({
    mutationFn: async (values: PlanFormValues) => {
      if (planId) {
        const { error } = await supabase
          .from("plans")
          .update(values)
          .eq("id", planId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("plans")
          .insert([values]);

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="features.max_users"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Users (-1 for unlimited)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="features.storage"
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
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="features.max_projects"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Projects (-1 for unlimited)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : (planId ? "Save Changes" : "Create Plan")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
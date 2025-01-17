import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function usePlanForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      let features;
      try {
        features = JSON.parse(data.features);
      } catch (e) {
        toast({
          title: "Invalid JSON format in features",
          description: "Please check the JSON format and try again",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from("plans").insert({
        name: data.name,
        description: data.description,
        price: data.price_monthly,
        price_monthly: data.price_monthly,
        price_semiannual: data.price_semiannual,
        price_annual: data.price_annual,
        discount_semiannual: data.discount_semiannual,
        discount_annual: data.discount_annual,
        status: data.status,
        features,
        billing_period: "monthly",
      });

      if (error) throw error;

      toast({
        title: "Plan created successfully",
        description: "The new plan has been created",
      });

      navigate("/admin/plans");
    } catch (error) {
      toast({
        title: "Error creating plan",
        description: "There was an error creating the plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { onSubmit, isSubmitting };
}
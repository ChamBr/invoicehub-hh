import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
          title: "Formato JSON inválido",
          description: "Por favor, verifique o formato JSON e tente novamente",
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
        title: "Plano criado com sucesso",
        description: "O novo plano foi criado",
      });

      navigate("/admin/plans");
    } catch (error) {
      toast({
        title: "Erro ao criar plano",
        description: "Houve um erro ao criar o plano. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { onSubmit, isSubmitting };
}
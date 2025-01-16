import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CustomerFormValues } from "../types";

export const useCustomerSubmit = (onSuccess: () => void) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: CustomerFormValues) => {
    try {
      setIsSubmitting(true);
      console.log("Submitting values:", values); // Log para debug
      
      const { data, error } = await supabase.from("customers").insert([
        {
          name: values.name,
          email: values.email,
          phone: values.phone,
          address: values.address,
          city: values.city,
          state: values.state,
          zip_code: values.zipCode,
          notes: values.notes,
          tax_exempt: values.taxExempt,
          tax_id: values.taxId,
          type: values.type,
          contact_name: values.contactName,
        },
      ]).select();

      if (error) {
        console.error("Supabase error:", error); // Log para debug
        throw error;
      }

      console.log("Success response:", data); // Log para debug

      toast({
        title: "Cliente cadastrado com sucesso!",
        description: `O cliente ${values.name} foi cadastrado.`,
      });

      onSuccess();
    } catch (error) {
      console.error("Error details:", error); // Log para debug
      toast({
        variant: "destructive",
        title: "Erro ao cadastrar cliente",
        description: "Ocorreu um erro ao tentar cadastrar o cliente. Por favor, tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleSubmit,
  };
};
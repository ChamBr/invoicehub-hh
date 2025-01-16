import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CustomerFormValues } from "../types";

export const useCustomerSubmit = (onSuccess: () => void, customerId?: string) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: CustomerFormValues) => {
    try {
      setIsSubmitting(true);
      console.log("Submitting values:", values);
      
      const customerData = {
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
      };

      let response;

      if (customerId) {
        response = await supabase
          .from("customers")
          .update(customerData)
          .eq('id', customerId)
          .select();
      } else {
        response = await supabase
          .from("customers")
          .insert([customerData])
          .select();
      }

      const { data, error } = response;

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      console.log("Success response:", data);

      toast({
        title: customerId ? "Cliente atualizado com sucesso!" : "Cliente cadastrado com sucesso!",
        description: `O cliente ${values.name} foi ${customerId ? 'atualizado' : 'cadastrado'}.`,
      });

      onSuccess();
    } catch (error) {
      console.error("Error details:", error);
      toast({
        variant: "destructive",
        title: customerId ? "Erro ao atualizar cliente" : "Erro ao cadastrar cliente",
        description: "Ocorreu um erro ao tentar salvar o cliente. Por favor, tente novamente.",
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
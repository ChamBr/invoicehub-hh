import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CustomerFormValues } from "../types";

export function useCustomerForm(
  onSuccess: () => void, 
  initialData?: CustomerFormValues | null,
  subscriberId?: string
) {
  const { toast } = useToast();
  const isLoadingSubscriber = false;

  const handleSubmit = async (data: CustomerFormValues) => {
    try {
      const customerData = {
        name: data.name,
        type: data.type,
        contact_name: data.contactName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        state: data.state,
        zip_code: data.zipCode,
        tax_exempt: data.taxExempt,
        tax_id: data.taxId,
        notes: data.notes,
        status: data.status,
        subscriber_id: subscriberId,
      };

      if (initialData?.id) {
        const { error } = await supabase
          .from("customers")
          .update(customerData)
          .eq("id", initialData.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("customers")
          .insert([customerData]);

        if (error) throw error;
      }

      toast({
        title: "Sucesso",
        description: initialData?.id
          ? "Cliente atualizado com sucesso!"
          : "Cliente criado com sucesso!",
      });

      onSuccess();
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Ocorreu um erro ao salvar o cliente. Por favor, tente novamente.",
      });
    }
  };

  return {
    handleSubmit,
    isLoadingSubscriber,
  };
}
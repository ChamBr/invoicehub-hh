import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { CustomerFormValues, customerFormSchema } from "./types";
import { CustomerTypeSelect } from "./CustomerTypeSelect";
import { CustomerBasicInfo } from "./form/CustomerBasicInfo";
import { CustomerContactForm } from "./form/CustomerContactForm";
import { CustomerTaxForm } from "./form/CustomerTaxForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";

interface CustomerFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  initialData?: CustomerFormValues | null;
  subscriberId?: string;
}

export function CustomerForm({ onSuccess, onCancel, initialData, subscriberId }: CustomerFormProps) {
  const { toast } = useToast();
  
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: initialData || {
      type: "personal",
      status: "active",
      country: "US",
      taxExempt: false
    }
  });

  const handleSubmit = async (data: CustomerFormValues) => {
    if (!subscriberId) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível identificar o assinante",
      });
      return;
    }

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
        description: "Ocorreu um erro ao salvar o cliente",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <CustomerTypeSelect form={form} />
        <CustomerBasicInfo form={form} />
        <CustomerContactForm form={form} />
        <CustomerTaxForm form={form} />
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  );
}
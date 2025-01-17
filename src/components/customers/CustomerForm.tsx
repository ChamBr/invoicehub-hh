import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { CustomerFormValues } from "./types";
import { CustomerTypeSelect } from "./CustomerTypeSelect";
import { CustomerBasicInfo } from "./form/CustomerBasicInfo";
import { CustomerContactForm } from "./form/CustomerContactForm";
import { CustomerTaxForm } from "./form/CustomerTaxForm";
import { useState } from "react";

interface CustomerFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  initialData?: CustomerFormValues | null;
  subscriberId?: string;
}

export function CustomerForm({ onSuccess, onCancel, initialData, subscriberId }: CustomerFormProps) {
  const { toast } = useToast();
  const [type, setType] = useState<"personal" | "company">("personal");
  const [formData, setFormData] = useState<Partial<CustomerFormValues>>(
    initialData || { type: "personal", status: "active" }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
        name: formData.name,
        type: formData.type,
        contact_name: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zipCode,
        tax_exempt: formData.taxExempt,
        tax_id: formData.taxId,
        notes: formData.notes,
        status: formData.status,
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
    <form onSubmit={handleSubmit}>
      <CustomerTypeSelect value={type} onChange={setType} />
      <CustomerBasicInfo formData={formData} setFormData={setFormData} />
      <CustomerContactForm formData={formData} setFormData={setFormData} />
      <CustomerTaxForm formData={formData} setFormData={setFormData} />
      <div className="flex justify-end mt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" className="ml-2">
          Salvar
        </Button>
      </div>
    </form>
  );
}

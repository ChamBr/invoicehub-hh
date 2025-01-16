import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AddressAutocomplete } from "@/components/ui/address-autocomplete";
import { CustomerTypeSelect } from "./CustomerTypeSelect";
import { CustomerContactInfo } from "./CustomerContactInfo";
import { CustomerTaxInfo } from "./CustomerTaxInfo";
import { CustomerNotesField } from "./CustomerNotesField";
import { customerFormSchema, type CustomerFormValues } from "./types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export function CustomerForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      type: "personal",
      taxExempt: false,
    },
  });

  const onSubmit = async (values: CustomerFormValues) => {
    try {
      const { error } = await supabase.from("customers").insert({
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
      });

      if (error) throw error;

      toast({
        title: "Cliente cadastrado com sucesso!",
        description: "Você será redirecionado para a lista de clientes.",
      });

      navigate("/customers");
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Erro ao cadastrar cliente",
        description: "Por favor, tente novamente.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <CustomerTypeSelect form={form} />
        <CustomerContactInfo form={form} />
        <AddressAutocomplete 
          onSelect={(address) => {
            form.setValue('address', address.place_name);
            form.setValue('city', address.city);
            form.setValue('state', address.state);
            form.setValue('zipCode', address.postcode);
          }}
        />
        <CustomerTaxInfo form={form} />
        <CustomerNotesField form={form} />

        <div className="flex gap-4 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/customers")}
          >
            Cancelar
          </Button>
          <Button type="submit">
            Salvar Cliente
          </Button>
        </div>
      </form>
    </Form>
  );
}
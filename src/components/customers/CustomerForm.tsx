import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CustomerTypeSelect } from "./CustomerTypeSelect";
import { CustomerContactInfo } from "./CustomerContactInfo";
import { CustomerTaxInfo } from "./CustomerTaxInfo";
import { CustomerNotesField } from "./CustomerNotesField";
import { CountrySelect } from "@/components/ui/country-select";
import { customerFormSchema, type CustomerFormValues } from "./types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useState } from "react";

interface CustomerFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function CustomerForm({ onSuccess, onCancel }: CustomerFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      type: "personal",
      taxExempt: false,
      country: "BR",
    },
  });

  const onSubmit = async (values: CustomerFormValues) => {
    try {
      setIsSubmitting(true);
      
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
        description: `O cliente ${values.name} foi cadastrado.`,
      });

      onSuccess();
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Erro ao cadastrar cliente",
        description: "Ocorreu um erro ao tentar cadastrar o cliente. Por favor, tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <CustomerTypeSelect form={form} />
        
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>País</FormLabel>
              <CountrySelect
                value={field.value}
                onValueChange={field.onChange}
              />
            </FormItem>
          )}
        />

        <CustomerContactInfo form={form} />
        <CustomerTaxInfo form={form} />
        <CustomerNotesField form={form} />

        <div className="flex gap-4 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar Cliente"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
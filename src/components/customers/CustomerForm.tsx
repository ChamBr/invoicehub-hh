import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { CustomerTypeSelect } from "./CustomerTypeSelect";
import { CustomerContactInfo } from "./CustomerContactInfo";
import { CustomerTaxInfo } from "./CustomerTaxInfo";
import { CustomerNotesField } from "./CustomerNotesField";
import { CountrySelect } from "@/components/ui/country-select";
import { customerFormSchema, type CustomerFormValues } from "./types";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { CustomerFormActions } from "./CustomerFormActions";
import { useCustomerSubmit } from "./hooks/useCustomerSubmit";
import { Input } from "@/components/ui/input";

interface CustomerFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function CustomerForm({ onSuccess, onCancel }: CustomerFormProps) {
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      type: "personal",
      taxExempt: false,
      country: "BR",
    },
  });

  const { isSubmitting, handleSubmit } = useCustomerSubmit(onSuccess);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <CustomerTypeSelect form={form} />
        
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome do cliente" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

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
        <CustomerFormActions isSubmitting={isSubmitting} onCancel={onCancel} />
      </form>
    </Form>
  );
}
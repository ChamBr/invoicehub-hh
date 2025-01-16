import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { CustomerTypeSelect } from "./CustomerTypeSelect";
import { CustomerContactForm } from "./form/CustomerContactForm";
import { CustomerTaxForm } from "./form/CustomerTaxForm";
import { CustomerNotesField } from "./CustomerNotesField";
import { CountrySelect } from "@/components/ui/country-select";
import { customerFormSchema, type CustomerFormValues } from "./types";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { CustomerFormActions } from "./CustomerFormActions";
import { useCustomerSubmit } from "./hooks/useCustomerSubmit";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";

interface CustomerFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  initialData?: CustomerFormValues | null;
}

export function CustomerForm({ onSuccess, onCancel, initialData }: CustomerFormProps) {
  const { t } = useTranslation();
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      type: initialData?.type || "personal",
      taxExempt: initialData?.taxExempt || false,
      country: initialData?.country || "BR",
      name: initialData?.name || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      notes: initialData?.notes || "",
      taxId: initialData?.taxId || "",
      contactName: initialData?.contactName || "",
      id: initialData?.id,
    },
  });

  const { isSubmitting, handleSubmit } = useCustomerSubmit(onSuccess, initialData?.id);
  const type = form.watch("type");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <CustomerTypeSelect form={form} />
        
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {type === "company" ? t('customers.form.company_name') : t('customers.form.name')}
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder={
                    type === "company" 
                      ? t('customers.form.company_name_placeholder') 
                      : t('customers.form.name_placeholder')
                  } 
                  {...field} 
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('customers.form.country')}</FormLabel>
              <CountrySelect
                value={field.value}
                onValueChange={field.onChange}
              />
            </FormItem>
          )}
        />

        <CustomerContactForm form={form} />
        <CustomerTaxForm form={form} />
        <CustomerNotesField form={form} />
        <CustomerFormActions isSubmitting={isSubmitting} onCancel={onCancel} />
      </form>
    </Form>
  );
}
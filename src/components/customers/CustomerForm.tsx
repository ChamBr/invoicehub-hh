import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { CustomerTypeSelect } from "./CustomerTypeSelect";
import { CustomerContactForm } from "./form/CustomerContactForm";
import { CustomerTaxForm } from "./form/CustomerTaxForm";
import { CustomerNotesField } from "./CustomerNotesField";
import { customerFormSchema, type CustomerFormValues } from "./types";
import { useCustomerSubmit } from "./hooks/useCustomerSubmit";
import { useTranslation } from "react-i18next";
import { FormSection } from "@/components/forms/FormSection";
import { FormRow } from "@/components/forms/FormRow";
import { FormActions } from "@/components/forms/FormActions";
import { CustomerBasicInfo } from "./form/CustomerBasicInfo";

interface CustomerFormProps {
  onSuccess: (customerId?: string) => void;
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormSection title={t('customers.form.basic_info')}>
          <CustomerTypeSelect form={form} />
          <FormRow>
            <CustomerBasicInfo form={form} />
          </FormRow>
        </FormSection>

        <FormSection title={t('customers.form.contact_info')}>
          <CustomerContactForm form={form} />
        </FormSection>

        <FormSection title={t('customers.form.tax_info')}>
          <CustomerTaxForm form={form} />
        </FormSection>

        <FormSection title={t('customers.form.additional_info')}>
          <CustomerNotesField form={form} />
        </FormSection>

        <FormActions 
          isSubmitting={isSubmitting} 
          onCancel={onCancel}
          submitLabel={initialData ? t('common.actions.save') : t('common.actions.create')}
        />
      </form>
    </Form>
  );
}
import { Form } from "@/components/ui/form";
import { CustomerFormValues } from "../types";
import { CustomerTypeSelect } from "../CustomerTypeSelect";
import { CustomerBasicInfo } from "./CustomerBasicInfo";
import { CustomerContactForm } from "./CustomerContactForm";
import { CustomerTaxForm } from "./CustomerTaxForm";
import { FormActions } from "@/components/forms/FormActions";
import { UseFormReturn } from "react-hook-form";

interface CustomerFormContentProps {
  form: UseFormReturn<CustomerFormValues>;
  onSubmit: (data: CustomerFormValues) => void;
  onCancel: () => void;
}

export function CustomerFormContent({ form, onSubmit, onCancel }: CustomerFormContentProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <CustomerTypeSelect form={form} />
        <CustomerBasicInfo form={form} />
        <CustomerContactForm form={form} />
        <CustomerTaxForm form={form} />
        <FormActions
          onCancel={onCancel}
          submitLabel="Salvar Cliente"
          cancelLabel="Cancelar"
        />
      </form>
    </Form>
  );
}
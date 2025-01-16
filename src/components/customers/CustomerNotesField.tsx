import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { CustomerFormValues } from "./types";
import { useTranslation } from "react-i18next";

interface CustomerNotesFieldProps {
  form: UseFormReturn<CustomerFormValues>;
}

export function CustomerNotesField({ form }: CustomerNotesFieldProps) {
  const { t } = useTranslation();
  
  return (
    <FormField
      control={form.control}
      name="notes"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('customers.form.notes')}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={t('customers.form.notes_placeholder')}
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
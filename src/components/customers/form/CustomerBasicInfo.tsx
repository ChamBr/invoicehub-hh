import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CountrySelect } from "@/components/ui/country-select";
import { UseFormReturn } from "react-hook-form";
import { CustomerFormValues } from "../types";
import { useTranslation } from "react-i18next";

interface CustomerBasicInfoProps {
  form: UseFormReturn<CustomerFormValues>;
}

export function CustomerBasicInfo({ form }: CustomerBasicInfoProps) {
  const { t } = useTranslation();
  const type = form.watch("type");

  return (
    <>
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
    </>
  );
}
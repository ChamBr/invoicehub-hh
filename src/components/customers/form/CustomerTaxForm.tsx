import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { FileText } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { CustomerFormValues, addressFormats } from "../types";
import { useTranslation } from "react-i18next";

interface CustomerTaxFormProps {
  form: UseFormReturn<CustomerFormValues>;
}

export function CustomerTaxForm({ form }: CustomerTaxFormProps) {
  const { t } = useTranslation();
  const country = form.watch("country");
  const type = form.watch("type");
  const taxExempt = form.watch("taxExempt");
  
  const format = addressFormats[country] || addressFormats.US;
  const taxIdLabel = type === "company" && country === "BR" ? "CNPJ" : format.taxIdLabel;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <FormLabel>{t('customers.form.tax_exempt')}</FormLabel>
          <p className="text-sm text-muted-foreground">
            {t('customers.form.tax_exempt_description')}
          </p>
        </div>
        <FormField
          control={form.control}
          name="taxExempt"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    if (checked) {
                      form.setValue("taxId", "");
                    }
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      {!form.getValues("taxExempt") && (
        <FormField
          control={form.control}
          name="taxId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{taxIdLabel}</FormLabel>
              <FormControl>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    className="pl-10" 
                    placeholder={format.taxIdMask}
                    {...field} 
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      )}
    </div>
  );
}
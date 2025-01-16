import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";

interface ProductPricingFieldsProps {
  form: any;
}

export const ProductPricingFields = ({ form }: ProductPricingFieldsProps) => {
  const { t } = useTranslation();

  return (
    <>
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('products.form.price')}</FormLabel>
            <FormControl>
              <Input
                type="number"
                step="0.01"
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                value={field.value}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="sku"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('products.form.sku')}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
};
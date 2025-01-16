import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";

interface ProductStockFieldProps {
  form: any;
  show: boolean;
}

export const ProductStockField = ({ form, show }: ProductStockFieldProps) => {
  const { t } = useTranslation();

  if (!show) return null;

  return (
    <FormField
      control={form.control}
      name="stock"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('products.form.stock')}</FormLabel>
          <FormControl>
            <Input
              type="number"
              onChange={(e) => field.onChange(parseInt(e.target.value))}
              value={field.value}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
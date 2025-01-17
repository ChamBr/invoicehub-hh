import { Control } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface PlanPricingFieldsProps {
  control: Control<any>;
}

export function PlanPricingFields({ control }: PlanPricingFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <FormField
        control={control}
        name="price_monthly"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Monthly Price (USD)</FormLabel>
            <FormControl>
              <Input
                type="number"
                step="0.01"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="price_semiannual"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Semi-Annual Price (USD)</FormLabel>
            <FormControl>
              <Input
                type="number"
                step="0.01"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="price_annual"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Annual Price (USD)</FormLabel>
            <FormControl>
              <Input
                type="number"
                step="0.01"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
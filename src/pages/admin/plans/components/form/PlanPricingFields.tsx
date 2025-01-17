import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormRow } from "@/components/forms/FormRow";

interface PlanPricingFieldsProps {
  control: Control<any>;
}

export function PlanPricingFields({ control }: PlanPricingFieldsProps) {
  return (
    <FormRow>
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
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
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
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="discount_annual"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Annual Discount (%)</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                min="0" 
                max="100" 
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </FormRow>
  );
}
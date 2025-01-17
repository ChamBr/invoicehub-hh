import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormRow } from "@/components/forms/FormRow";
import { Card } from "@/components/ui/card";

interface PlanPricingFieldsProps {
  control: Control<any>;
}

export function PlanPricingFields({ control }: PlanPricingFieldsProps) {
  return (
    <Card className="p-4">
      <div className="grid grid-cols-3 gap-4">
        <FormField
          control={control}
          name="price_monthly"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço Mensal (USD)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
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
              <FormLabel>Preço Anual (USD)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
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
              <FormLabel>Desconto Anual (%)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="0"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </Card>
  );
}
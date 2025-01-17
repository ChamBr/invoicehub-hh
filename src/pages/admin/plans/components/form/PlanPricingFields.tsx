import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { Card } from "@/components/ui/card";

interface PlanPricingFieldsProps {
  control: Control<any>;
}

export function PlanPricingFields({ control }: PlanPricingFieldsProps) {
  return (
    <Card className="p-3">
      <div className="grid grid-cols-3 gap-3">
        <FormField
          control={control}
          name="price_monthly"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Preço Mensal (USD)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="h-8 text-sm"
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
              <FormLabel className="text-xs">Preço Anual (USD)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="h-8 text-sm"
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
              <FormLabel className="text-xs">Desconto Anual (%)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="0"
                  className="h-8 text-sm"
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
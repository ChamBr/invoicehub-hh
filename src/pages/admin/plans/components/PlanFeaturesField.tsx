import { Control } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface PlanFeaturesFieldProps {
  control: Control<any>;
}

export function PlanFeaturesField({ control }: PlanFeaturesFieldProps) {
  return (
    <FormField
      control={control}
      name="features"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Features (JSON format)</FormLabel>
          <FormControl>
            <Textarea
              className="font-mono"
              rows={10}
              {...field}
              onChange={(e) => {
                try {
                  const value = JSON.parse(e.target.value);
                  field.onChange(value);
                } catch {
                  field.onChange(e.target.value);
                }
              }}
              value={typeof field.value === 'object' ? JSON.stringify(field.value, null, 2) : field.value}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
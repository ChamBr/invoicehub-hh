import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { CustomerFormValues } from "./types";

interface CustomerNotesFieldProps {
  form: UseFormReturn<CustomerFormValues>;
}

export function CustomerNotesField({ form }: CustomerNotesFieldProps) {
  return (
    <FormField
      control={form.control}
      name="notes"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Observações</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Adicione observações sobre o cliente..."
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
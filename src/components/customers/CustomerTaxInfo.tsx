import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { DollarSign } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { CustomerFormValues } from "./types";

interface CustomerTaxInfoProps {
  form: UseFormReturn<CustomerFormValues>;
}

export function CustomerTaxInfo({ form }: CustomerTaxInfoProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <FormLabel>Isenção de Impostos</FormLabel>
          <p className="text-sm text-muted-foreground">
            O cliente está isento de impostos?
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
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      {form.watch("taxExempt") && (
        <FormField
          control={form.control}
          name="taxId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tax ID (CPF/CNPJ)</FormLabel>
              <FormControl>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-10" placeholder="000.000.000-00" {...field} />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      )}
    </div>
  );
}
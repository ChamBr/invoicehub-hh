import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { DollarSign } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { CustomerFormValues, addressFormats } from "./types";

interface CustomerTaxInfoProps {
  form: UseFormReturn<CustomerFormValues>;
}

export function CustomerTaxInfo({ form }: CustomerTaxInfoProps) {
  const country = form.watch("country");
  const type = form.watch("type");
  const taxExempt = form.watch("taxExempt");
  
  const format = addressFormats[country] || addressFormats.US;
  const taxIdLabel = type === "company" && country === "BR" ? "CNPJ" : format.taxIdLabel;

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

      {!taxExempt && (
        <FormField
          control={form.control}
          name="taxId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{taxIdLabel}</FormLabel>
              <FormControl>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
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
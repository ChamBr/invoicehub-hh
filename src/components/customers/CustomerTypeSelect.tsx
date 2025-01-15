import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Building, User } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { CustomerFormValues } from "./types";

interface CustomerTypeSelectProps {
  form: UseFormReturn<CustomerFormValues>;
}

export function CustomerTypeSelect({ form }: CustomerTypeSelectProps) {
  const isCompany = form.watch("type") === "company";

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Tipo de Cliente</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col sm:flex-row gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="personal" id="personal" />
                  <User className="w-4 h-4 text-muted-foreground" />
                  <label htmlFor="personal">Pessoa Física</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="company" id="company" />
                  <Building className="w-4 h-4 text-muted-foreground" />
                  <label htmlFor="company">Empresa</label>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />

      {isCompany && (
        <FormField
          control={form.control}
          name="contactName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Contato</FormLabel>
              <FormControl>
                <Input placeholder="Nome do contato na empresa" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      )}
    </div>
  );
}
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Mail, Phone } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { CustomerFormValues } from "./types";

interface CustomerContactInfoProps {
  form: UseFormReturn<CustomerFormValues>;
}

export function CustomerContactInfo({ form }: CustomerContactInfoProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input className="pl-10" placeholder="email@exemplo.com" {...field} />
              </div>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Telefone</FormLabel>
            <FormControl>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input className="pl-10" placeholder="(11) 99999-9999" {...field} />
              </div>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
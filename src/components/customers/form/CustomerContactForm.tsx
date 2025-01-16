import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Mail, Phone } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { CustomerFormValues } from "../types";
import InputMask from "react-input-mask";
import { useTranslation } from "react-i18next";

interface CustomerContactFormProps {
  form: UseFormReturn<CustomerFormValues>;
}

export function CustomerContactForm({ form }: CustomerContactFormProps) {
  const { t } = useTranslation();
  const country = form.watch("country");
  
  const getPhoneMask = () => {
    switch (country) {
      case "BR":
        return "+55 (99) 99999-9999";
      case "US":
        return "+1 (999) 999-9999";
      default:
        return "+55 (99) 99999-9999";
    }
  };

  const getPhonePlaceholder = () => {
    switch (country) {
      case "BR":
        return "+55 (11) 98765-4321";
      case "US":
        return "+1 (555) 123-4567";
      default:
        return "+55 (11) 98765-4321";
    }
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('customers.form.email')}</FormLabel>
            <FormControl>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  className="pl-10" 
                  placeholder={t('customers.form.email_placeholder')} 
                  {...field} 
                />
              </div>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phone"
        render={({ field: { onChange, value, ...field } }) => (
          <FormItem>
            <FormLabel>{t('customers.form.phone')}</FormLabel>
            <FormControl>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <InputMask
                  mask={getPhoneMask()}
                  value={value || ""}
                  onChange={onChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
                  placeholder={getPhonePlaceholder()}
                  {...field}
                />
              </div>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
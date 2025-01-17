import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Control } from "react-hook-form";
import { Card } from "@/components/ui/card";

interface PlanFeaturesFieldsProps {
  control: Control<any>;
}

export function PlanFeaturesFields({ control }: PlanFeaturesFieldsProps) {
  return (
    <div className="space-y-3">
      <Card className="p-3">
        <h3 className="text-sm font-semibold mb-2">Limites do Plano</h3>
        <div className="grid grid-cols-5 gap-3">
          <FormField
            control={control}
            name="features.max_users"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Usuários</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="h-8 text-sm"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormDescription className="text-[10px]">-1 = ilimitado</FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="features.max_invoices"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Faturas/Mês</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="h-8 text-sm"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormDescription className="text-[10px]">-1 = ilimitado</FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="features.max_products"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Produtos</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="h-8 text-sm"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormDescription className="text-[10px]">-1 = ilimitado</FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="features.max_customers"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Clientes</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="h-8 text-sm"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormDescription className="text-[10px]">-1 = ilimitado</FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="features.storage_gb"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Storage (GB)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="h-8 text-sm"
                    step="0.25"
                    min="0.25"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormDescription className="text-[10px]">Min: 0.25GB</FormDescription>
              </FormItem>
            )}
          />
        </div>
      </Card>

      <Card className="p-3">
        <h3 className="text-sm font-semibold mb-2">Recursos Adicionais</h3>
        <div className="grid grid-cols-3 gap-2">
          <FormField
            control={control}
            name="features.logo_replace"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between space-y-0 rounded-lg border p-2">
                <div>
                  <FormLabel className="text-xs">Logo</FormLabel>
                  <FormDescription className="text-[10px]">
                    Alterar logo
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="features.invoice_templates"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between space-y-0 rounded-lg border p-2">
                <div>
                  <FormLabel className="text-xs">Templates</FormLabel>
                  <FormDescription className="text-[10px]">
                    Templates personalizados
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="features.translations"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between space-y-0 rounded-lg border p-2">
                <div>
                  <FormLabel className="text-xs">Translations</FormLabel>
                  <FormDescription className="text-[10px]">
                    Traduções
                  </FormDescription>
                </div>
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
      </Card>
    </div>
  );
}
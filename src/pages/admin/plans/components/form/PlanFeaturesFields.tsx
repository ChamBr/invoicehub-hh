import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Control } from "react-hook-form";
import { FormRow } from "@/components/forms/FormRow";
import { Card } from "@/components/ui/card";

interface PlanFeaturesFieldsProps {
  control: Control<any>;
}

export function PlanFeaturesFields({ control }: PlanFeaturesFieldsProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-6">
        <h3 className="text-lg font-semibold">Limites do Plano</h3>
        <FormRow>
          <FormField
            control={control}
            name="features.max_users"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Máximo de Usuários</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormDescription>-1 para ilimitado</FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="features.max_invoices_per_month"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Faturas por Mês</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormDescription>-1 para ilimitado</FormDescription>
              </FormItem>
            )}
          />
        </FormRow>

        <FormRow>
          <FormField
            control={control}
            name="features.max_products"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Máximo de Produtos</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormDescription>-1 para ilimitado</FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="features.max_customers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Máximo de Clientes</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormDescription>-1 para ilimitado</FormDescription>
              </FormItem>
            )}
          />
        </FormRow>

        <FormField
          control={control}
          name="features.storage_gb"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Armazenamento (GB)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormDescription>-1 para ilimitado</FormDescription>
            </FormItem>
          )}
        />
      </Card>

      <Card className="p-6 space-y-6">
        <h3 className="text-lg font-semibold">Recursos Adicionais</h3>
        <div className="grid gap-6">
          <FormField
            control={control}
            name="features.logo_replace"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Substituição de Logo</FormLabel>
                  <FormDescription>
                    Permite alterar o logo nas faturas
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
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Templates de Fatura</FormLabel>
                  <FormDescription>
                    Acesso a templates personalizados
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
            name="features.ai_assistance"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Assistência AI</FormLabel>
                  <FormDescription>
                    Recursos de IA para textos e traduções
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
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Control } from "react-hook-form";
import { FormRow } from "@/components/forms/FormRow";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PlanFeaturesFieldsProps {
  control: Control<any>;
}

export function PlanFeaturesFields({ control }: PlanFeaturesFieldsProps) {
  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-4">
        <Card className="p-4">
          <h3 className="text-sm font-semibold mb-3">Limites do Plano</h3>
          <div className="grid grid-cols-2 gap-4">
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
                  <FormDescription className="text-xs">-1 para ilimitado</FormDescription>
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
                  <FormDescription className="text-xs">-1 para ilimitado</FormDescription>
                </FormItem>
              )}
            />

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
                  <FormDescription className="text-xs">-1 para ilimitado</FormDescription>
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
                  <FormDescription className="text-xs">-1 para ilimitado</FormDescription>
                </FormItem>
              )}
            />

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
                  <FormDescription className="text-xs">-1 para ilimitado</FormDescription>
                </FormItem>
              )}
            />
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-semibold mb-3">Recursos Adicionais</h3>
          <div className="grid grid-cols-1 gap-3">
            <FormField
              control={control}
              name="features.logo_replace"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between space-y-0 rounded-lg border p-3">
                  <div>
                    <FormLabel>Substituição de Logo</FormLabel>
                    <FormDescription className="text-xs">
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
                <FormItem className="flex items-center justify-between space-y-0 rounded-lg border p-3">
                  <div>
                    <FormLabel>Templates de Fatura</FormLabel>
                    <FormDescription className="text-xs">
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
                <FormItem className="flex items-center justify-between space-y-0 rounded-lg border p-3">
                  <div>
                    <FormLabel>Assistência AI</FormLabel>
                    <FormDescription className="text-xs">
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
    </ScrollArea>
  );
}
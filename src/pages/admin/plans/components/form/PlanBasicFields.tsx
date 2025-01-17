import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Control } from "react-hook-form";
import { Card } from "@/components/ui/card";

interface PlanBasicFieldsProps {
  control: Control<any>;
}

export function PlanBasicFields({ control }: PlanBasicFieldsProps) {
  return (
    <Card className="p-3">
      <div className="grid gap-3">
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Nome do Plano</FormLabel>
                <FormControl>
                  <Input className="h-8 text-sm" placeholder="Ex: Plano Básico" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-2">
                <div className="space-y-0.5">
                  <FormLabel className="text-xs">Status</FormLabel>
                  <FormDescription className="text-[10px]">
                    {field.value === "active" ? "Plano Ativo" : "Plano Inativo"}
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value === "active"}
                    onCheckedChange={(checked) =>
                      field.onChange(checked ? "active" : "inactive")
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Descrição</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Descreva os benefícios do plano..."
                  className="resize-none h-16 text-sm"
                  {...field} 
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </Card>
  );
}
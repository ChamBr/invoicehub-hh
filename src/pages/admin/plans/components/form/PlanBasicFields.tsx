import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Control } from "react-hook-form";
import { FormRow } from "@/components/forms/FormRow";

interface PlanBasicFieldsProps {
  control: Control<any>;
}

export function PlanBasicFields({ control }: PlanBasicFieldsProps) {
  return (
    <div className="space-y-4">
      <FormRow>
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Plano</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Plano Básico" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Status</FormLabel>
                <FormDescription>
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
      </FormRow>

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descrição</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Descreva os benefícios do plano..."
                className="resize-none"
                {...field} 
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
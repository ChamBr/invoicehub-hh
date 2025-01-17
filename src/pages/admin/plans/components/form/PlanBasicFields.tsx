import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
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
    <FormRow>
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} />
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
              <FormLabel>Active</FormLabel>
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

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </FormRow>
  );
}
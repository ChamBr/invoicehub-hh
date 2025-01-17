import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Control } from "react-hook-form";
import { FormRow } from "@/components/forms/FormRow";

interface PlanFeaturesFieldsProps {
  control: Control<any>;
}

export function PlanFeaturesFields({ control }: PlanFeaturesFieldsProps) {
  return (
    <>
      <FormRow>
        <FormField
          control={control}
          name="features.max_users"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max Users</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormDescription>Set to -1 for unlimited</FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="features.max_invoices_per_month"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max Invoices per Month</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormDescription>Set to -1 for unlimited</FormDescription>
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
              <FormLabel>Max Products</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormDescription>Set to -1 for unlimited</FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="features.max_customers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max Customers</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormDescription>Set to -1 for unlimited</FormDescription>
            </FormItem>
          )}
        />
      </FormRow>

      <FormRow>
        <FormField
          control={control}
          name="features.storage_gb"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Storage (GB)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormDescription>Set to -1 for unlimited</FormDescription>
            </FormItem>
          )}
        />
      </FormRow>

      <FormRow>
        <FormField
          control={control}
          name="features.logo_replace"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Logo Replacement</FormLabel>
                <FormDescription>
                  Allow changing invoice logo
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
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Invoice Templates</FormLabel>
                <FormDescription>
                  Access to custom invoice templates
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
      </FormRow>

      <FormRow>
        <FormField
          control={control}
          name="features.ai_assistance"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">AI Assistance</FormLabel>
                <FormDescription>
                  AI-powered text and translation features
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
      </FormRow>
    </>
  );
}
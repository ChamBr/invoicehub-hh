import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePlanForm } from "../hooks/usePlanForm";
import { PlanPricingFields } from "./PlanPricingFields";
import { PlanFeaturesField } from "./PlanFeaturesField";

export function PlanForm() {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      status: "active",
      discount_semiannual: 10,
      discount_annual: 20,
      features: JSON.stringify(
        {
          users: 1,
          storage: "5GB",
          support: "Email",
          features: ["Basic Feature 1", "Basic Feature 2"],
        },
        null,
        2
      ),
    },
  });

  const { onSubmit, isSubmitting } = usePlanForm();
  const monthlyPrice = watch("price_monthly");

  useEffect(() => {
    if (monthlyPrice) {
      const semiannualDiscount = 10;
      const annualDiscount = 20;

      setValue("discount_semiannual", semiannualDiscount);
      setValue("discount_annual", annualDiscount);

      const semiannualPrice = monthlyPrice * 6 * (1 - semiannualDiscount / 100);
      const annualPrice = monthlyPrice * 12 * (1 - annualDiscount / 100);

      setValue("price_semiannual", Number(semiannualPrice.toFixed(2)));
      setValue("price_annual", Number(annualPrice.toFixed(2)));
    }
  }, [monthlyPrice, setValue]);

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Create New Plan</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Plan Name</Label>
            <Input id="name" {...register("name")} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              onValueChange={(value) => setValue("status", value)}
              defaultValue="active"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <PlanPricingFields register={register} watch={watch} />
        <PlanFeaturesField register={register} />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate("/admin/plans")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Plan"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
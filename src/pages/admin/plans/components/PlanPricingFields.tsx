import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PlanPricingFieldsProps {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
}

export function PlanPricingFields({ register, watch }: PlanPricingFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="space-y-2">
        <Label htmlFor="price_monthly">Monthly Price (USD)</Label>
        <Input
          id="price_monthly"
          type="number"
          step="0.01"
          {...register("price_monthly", { valueAsNumber: true })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price_semiannual">Semi-Annual Price (USD)</Label>
        <Input
          id="price_semiannual"
          type="number"
          step="0.01"
          {...register("price_semiannual", { valueAsNumber: true })}
          required
        />
        <p className="text-sm text-gray-500">
          Suggested discount:{" "}
          <span className="font-medium">{watch("discount_semiannual")}%</span>
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="price_annual">Annual Price (USD)</Label>
        <Input
          id="price_annual"
          type="number"
          step="0.01"
          {...register("price_annual", { valueAsNumber: true })}
          required
        />
        <p className="text-sm text-gray-500">
          Suggested discount:{" "}
          <span className="font-medium">{watch("discount_annual")}%</span>
        </p>
      </div>
    </div>
  );
}
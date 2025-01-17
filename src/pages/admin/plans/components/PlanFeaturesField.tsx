import { UseFormRegister } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface PlanFeaturesFieldProps {
  register: UseFormRegister<any>;
}

export function PlanFeaturesField({ register }: PlanFeaturesFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="features">Features (JSON format)</Label>
      <Textarea
        id="features"
        {...register("features")}
        className="font-mono"
        rows={10}
      />
      <p className="text-sm text-gray-500">
        Enter features as a JSON object. Example:
        {`
{
  "users": 5,
  "storage": "10GB",
  "support": "24/7",
  "features": [
    "Feature 1",
    "Feature 2"
  ]
}
        `}
      </p>
    </div>
  );
}
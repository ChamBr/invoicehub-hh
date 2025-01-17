import { Check } from "lucide-react";
import { PlanFeatures } from "./types";

interface PlanFeaturesListProps {
  features: PlanFeatures;
}

export function PlanFeaturesList({ features }: PlanFeaturesListProps) {
  const renderFeatureValue = (key: keyof PlanFeatures, value: any) => {
    if (key === "storage_gb") {
      return value === -1 ? "Unlimited" : `${value}GB`;
    }
    if (key.startsWith("max_")) {
      return value === -1 ? "Unlimited" : value;
    }
    return value ? "Yes" : "No";
  };

  return (
    <div className="space-y-2 text-sm">
      {Object.entries(features).map(([key, value]) => (
        <div key={key} className="flex items-center gap-2">
          <Check className="h-4 w-4 text-primary flex-shrink-0" />
          <span>
            {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}: {" "}
            {renderFeatureValue(key as keyof PlanFeatures, value)}
          </span>
        </div>
      ))}
    </div>
  );
}
import { PlanFeatures } from "@/pages/profile/components/plan/types";

interface PlanFeaturesListProps {
  features: PlanFeatures;
}

export function PlanFeaturesList({ features }: PlanFeaturesListProps) {
  if (!features) return null;
  
  const formatFeatureValue = (key: keyof PlanFeatures, value: any) => {
    if (key.startsWith('max_')) {
      return value === -1 ? 'Unlimited' : value;
    }
    return value ? 'Yes' : 'No';
  };

  return (
    <div className="space-y-1 text-sm">
      {(Object.entries(features) as [keyof PlanFeatures, any][]).map(([key, value]) => (
        <div key={key} className="flex justify-between">
          <span className="text-gray-600">
            {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </span>
          <span className="font-medium">{formatFeatureValue(key, value)}</span>
        </div>
      ))}
    </div>
  );
}
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  secondaryValue?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function MetricCard({
  title,
  value,
  secondaryValue,
  icon,
  trend,
  className,
}: MetricCardProps) {
  return (
    <Card className={cn("p-6 -mt-[1px]", className)}>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div>
            <p className="text-2xl font-semibold">{value}</p>
            {secondaryValue && (
              <p className="text-sm text-gray-500">{secondaryValue}</p>
            )}
          </div>
          {trend && (
            <p
              className={cn(
                "text-xs font-medium",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}
            >
              {trend.isPositive ? "+" : "-"}{trend.value}%
            </p>
          )}
        </div>
        <div
          className={cn(
            "rounded-lg p-2",
            trend?.isPositive
              ? "bg-green-50 text-green-600"
              : trend
              ? "bg-red-50 text-red-600"
              : "bg-gray-50 text-gray-600"
          )}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
}
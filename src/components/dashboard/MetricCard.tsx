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
    <Card className={cn("p-6 h-full", className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
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
            <p className="text-sm font-medium text-gray-500">{title}</p>
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-semibold">{value}</p>
              {trend && (
                <p
                  className={cn(
                    "text-xs font-medium",
                    trend.isPositive ? "text-green-600" : "text-red-600"
                  )}
                >
                  {trend.isPositive ? "↑" : "↓"} {trend.value}%
                </p>
              )}
            </div>
            {secondaryValue && (
              <p className="text-sm text-gray-500 text-right">{secondaryValue}</p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
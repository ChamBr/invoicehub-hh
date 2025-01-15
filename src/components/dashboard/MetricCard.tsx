import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function MetricCard({ title, value, icon, trend, className }: MetricCardProps) {
  return (
    <Card className={cn("p-6 space-y-2", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="text-primary-dark">{icon}</div>
      </div>
      <div className="flex items-baseline justify-between">
        <p className="text-2xl font-semibold">{value}</p>
        {trend && (
          <div className={cn(
            "text-sm flex items-center",
            trend.isPositive ? "text-green-600" : "text-red-600"
          )}>
            {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
          </div>
        )}
      </div>
    </Card>
  );
}
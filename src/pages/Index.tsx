import { useTranslation } from 'react-i18next';
import { DollarSign, TrendingUp, Users, AlertCircle } from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { MetricSettings } from "@/components/dashboard/MetricSettings";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { RecentInvoices } from "@/components/dashboard/RecentInvoices";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface DashboardMetric {
  id: string;
  title: string;
  value: string;
  secondaryValue?: string;
  icon: keyof typeof metricIcons;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  isEnabled: boolean;
  order: number;
}

const metricIcons = {
  DollarSign,
  TrendingUp,
  Users,
  AlertCircle,
};

const defaultMetrics: DashboardMetric[] = [
  {
    id: "revenue",
    title: "Total Revenue",
    value: "$45,231.89",
    icon: "DollarSign",
    trend: { value: 12, isPositive: true },
    isEnabled: true,
    order: 0,
  },
  {
    id: "growth",
    title: "Monthly Growth",
    value: "+22.5%",
    icon: "TrendingUp",
    trend: { value: 8, isPositive: true },
    isEnabled: true,
    order: 1,
  },
  {
    id: "clients",
    title: "Active Clients",
    value: "1,234",
    icon: "Users",
    trend: { value: 2, isPositive: false },
    isEnabled: true,
    order: 2,
  },
  {
    id: "overdue",
    title: "Overdue Invoices",
    value: "23",
    secondaryValue: "R$ 12.450,00",
    icon: "AlertCircle",
    isEnabled: true,
    order: 3,
  },
];

const Index = () => {
  const { t } = useTranslation();
  const [metrics, setMetrics] = useState<DashboardMetric[]>(defaultMetrics);

  useEffect(() => {
    const fetchUserMetrics = async () => {
      const { data: userMetrics, error } = await supabase
        .from("user_dashboard_metrics")
        .select("*")
        .single();

      if (error && error.code !== "PGNF") {
        toast({
          title: "Error",
          description: "Failed to load dashboard preferences",
          variant: "destructive",
        });
        return;
      }

      if (userMetrics?.metrics) {
        const updatedMetrics = defaultMetrics.map((metric) => ({
          ...metric,
          isEnabled: userMetrics.metrics.includes(metric.id),
        }));
        setMetrics(updatedMetrics);
      }
    };

    fetchUserMetrics();
  }, []);

  const enabledMetrics = metrics
    .filter((metric) => metric.isEnabled)
    .sort((a, b) => a.order - b.order);

  const handleMetricsUpdate = (enabledMetricIds: string[]) => {
    const updatedMetrics = metrics.map((metric) => ({
      ...metric,
      isEnabled: enabledMetricIds.includes(metric.id),
    }));
    setMetrics(updatedMetrics);
  };

  return (
    <div className="flex-grow p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-2">{t('dashboard.welcome')}</p>
          </div>
          <MetricSettings
            metrics={metrics.map(({ id, title, isEnabled }) => ({
              id,
              title,
              isEnabled,
            }))}
            onUpdate={handleMetricsUpdate}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {enabledMetrics.map((metric) => {
            const IconComponent = metricIcons[metric.icon];
            return (
              <MetricCard
                key={metric.id}
                title={metric.title}
                value={metric.value}
                secondaryValue={metric.secondaryValue}
                icon={<IconComponent className="h-5 w-5" />}
                trend={metric.trend}
              />
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <div>
            <RecentInvoices />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
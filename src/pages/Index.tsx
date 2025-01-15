import { useTranslation } from 'react-i18next';
import { DollarSign, TrendingUp, Users, AlertCircle } from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { RecentInvoices } from "@/components/dashboard/RecentInvoices";

const Index = () => {
  const { t } = useTranslation();

  return (
    <div className="flex-grow p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-2">{t('dashboard.welcome')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title={t('dashboard.metrics.totalRevenue')}
            value="$45,231.89"
            icon={<DollarSign className="h-5 w-5" />}
            trend={{ value: 12, isPositive: true }}
          />
          <MetricCard
            title={t('dashboard.metrics.monthlyGrowth')}
            value="+22.5%"
            icon={<TrendingUp className="h-5 w-5" />}
            trend={{ value: 8, isPositive: true }}
          />
          <MetricCard
            title={t('dashboard.metrics.activeClients')}
            value="1,234"
            icon={<Users className="h-5 w-5" />}
            trend={{ value: 2, isPositive: false }}
          />
          <MetricCard
            title={t('dashboard.metrics.overdueInvoices')}
            value="23"
            icon={<AlertCircle className="h-5 w-5" />}
            className="bg-red-50"
          />
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
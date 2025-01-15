import { DollarSign, TrendingUp, Users, AlertCircle } from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { RecentInvoices } from "@/components/dashboard/RecentInvoices";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-2">Welcome to InvoiceHub</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Revenue"
            value="$45,231.89"
            icon={<DollarSign className="h-5 w-5" />}
            trend={{ value: 12, isPositive: true }}
          />
          <MetricCard
            title="Monthly Growth"
            value="+22.5%"
            icon={<TrendingUp className="h-5 w-5" />}
            trend={{ value: 8, isPositive: true }}
          />
          <MetricCard
            title="Active Clients"
            value="1,234"
            icon={<Users className="h-5 w-5" />}
            trend={{ value: 2, isPositive: false }}
          />
          <MetricCard
            title="Overdue Invoices"
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
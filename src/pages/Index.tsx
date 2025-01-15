import { DollarSign, TrendingUp, Users, AlertCircle } from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { RecentInvoices } from "@/components/dashboard/RecentInvoices";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-xl font-semibold text-primary">InvoiceHub</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-600 hover:text-primary">Dashboard</a>
              <a href="#" className="text-gray-600 hover:text-primary">Invoices</a>
              <a href="#" className="text-gray-600 hover:text-primary">Reports</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow p-8">
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

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto py-4">
          <p className="text-center text-sm text-gray-500">
            HiveHub | alisson.ai
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
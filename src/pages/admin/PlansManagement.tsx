import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Plus, Edit2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const PlansManagement = () => {
  const navigate = useNavigate();

  const { data: plans, isLoading } = useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("plans")
        .select("*")
        .order("price_monthly", { ascending: true });

      if (error) throw error;
      return data || [];
    },
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const renderFeatures = (features: any) => {
    if (!features) return null;
    
    const formatFeatureValue = (key: string, value: any) => {
      if (key.startsWith('max_')) {
        return value === -1 ? 'Unlimited' : value;
      }
      return value ? 'Yes' : 'No';
    };

    return (
      <div className="space-y-1 text-sm">
        {Object.entries(features).map(([key, value]) => (
          <div key={key} className="flex justify-between">
            <span className="text-gray-600">{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
            <span className="font-medium">{formatFeatureValue(key, value)}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Plans Management</h2>
        <Button onClick={() => navigate("/admin/plans/new")}>
          <Plus className="h-4 w-4 mr-2" />
          New Plan
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Monthly</TableHead>
              <TableHead>Semi-Annual</TableHead>
              <TableHead>Annual</TableHead>
              <TableHead>Features</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans?.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell className="font-medium">{plan.name}</TableCell>
                <TableCell>{formatCurrency(plan.price_monthly || 0)}</TableCell>
                <TableCell>
                  {formatCurrency(plan.price_semiannual || 0)}
                  {plan.discount_semiannual > 0 && (
                    <span className="ml-2 text-sm text-emerald-600">
                      (-{plan.discount_semiannual}%)
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {formatCurrency(plan.price_annual || 0)}
                  {plan.discount_annual > 0 && (
                    <span className="ml-2 text-sm text-emerald-600">
                      (-{plan.discount_annual}%)
                    </span>
                  )}
                </TableCell>
                <TableCell>{renderFeatures(plan.features)}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      plan.status === "active"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {plan.status === "active" ? "Active" : "Inactive"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/admin/plans/edit/${plan.id}`)}
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
};
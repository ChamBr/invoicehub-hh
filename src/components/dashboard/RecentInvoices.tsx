import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function RecentInvoices() {
  const { data: invoices, isLoading } = useQuery({
    queryKey: ["recent-invoices"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("invoices")
        .select(`
          *,
          customer:customers(name)
        `)
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      return data;
    },
  });

  const { data: overdueInvoices } = useQuery({
    queryKey: ["overdue-invoices"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("invoices")
        .select("total")
        .eq("status", "overdue");

      if (error) throw error;
      return data;
    },
  });

  const totalOverdue = overdueInvoices?.reduce((sum, invoice) => sum + Number(invoice.total), 0) || 0;

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Faturas Recentes</h3>
        <div className="text-right">
          <p className="text-sm text-gray-500">Total Vencido</p>
          <p className="text-lg font-semibold text-red-600">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(totalOverdue)}
          </p>
        </div>
      </div>
      <div className="space-y-4">
        {invoices?.map((invoice) => (
          <div
            key={invoice.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="space-y-1">
              <p className="font-medium">{invoice.customer?.name}</p>
              <p className="text-sm text-gray-500">{invoice.id}</p>
            </div>
            <div className="text-right space-y-1">
              <p className="font-medium">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(invoice.total)}
              </p>
              <Badge
                variant="outline"
                className={cn(
                  "capitalize",
                  invoice.status === "paid" && "bg-green-100 text-green-800 border-green-600",
                  invoice.status === "pending" && "bg-yellow-100 text-yellow-800 border-yellow-600",
                  invoice.status === "overdue" && "bg-red-100 text-red-800 border-red-600"
                )}
              >
                {invoice.status === "paid"
                  ? "Pago"
                  : invoice.status === "pending"
                  ? "Pendente"
                  : "Vencido"}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
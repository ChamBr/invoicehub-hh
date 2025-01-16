import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { invoiceStatusConfig, type InvoiceStatus } from "@/components/invoices/types";
import * as Icons from "lucide-react";

const invoices = [
  {
    id: "INV001",
    client: "Acme Corp",
    amount: "$1,200.00",
    status: "paid" as InvoiceStatus,
    date: "2024-02-15",
  },
  {
    id: "INV002",
    client: "Globex Inc",
    amount: "$850.00",
    status: "pending" as InvoiceStatus,
    date: "2024-02-14",
  },
  {
    id: "INV003",
    client: "Wayne Enterprises",
    amount: "$3,400.00",
    status: "overdue" as InvoiceStatus,
    date: "2024-02-10",
  },
];

export function RecentInvoices() {
  const renderStatusIcon = (status: InvoiceStatus) => {
    const IconComponent = Icons[invoiceStatusConfig[status].icon as keyof typeof Icons];
    return <IconComponent className="h-4 w-4 mr-1" />;
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Faturas Recentes</h3>
      <div className="space-y-4">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="space-y-1">
              <p className="font-medium">{invoice.client}</p>
              <p className="text-sm text-gray-500">{invoice.id}</p>
            </div>
            <div className="text-right space-y-1">
              <p className="font-medium">{invoice.amount}</p>
              <Badge
                variant="outline"
                className={cn(
                  "capitalize inline-flex items-center",
                  invoiceStatusConfig[invoice.status].color
                )}
              >
                {renderStatusIcon(invoice.status)}
                {invoiceStatusConfig[invoice.status].label}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
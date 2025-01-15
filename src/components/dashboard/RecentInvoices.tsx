import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const invoices = [
  {
    id: "INV001",
    client: "Acme Corp",
    amount: "$1,200.00",
    status: "paid",
    date: "2024-02-15",
  },
  {
    id: "INV002",
    client: "Globex Inc",
    amount: "$850.00",
    status: "pending",
    date: "2024-02-14",
  },
  {
    id: "INV003",
    client: "Wayne Enterprises",
    amount: "$3,400.00",
    status: "overdue",
    date: "2024-02-10",
  },
];

export function RecentInvoices() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Invoices</h3>
      <div className="space-y-4">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
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
                  "capitalize",
                  invoice.status === "paid" && "bg-green-100 text-green-800 border-green-600",
                  invoice.status === "pending" && "bg-yellow-100 text-yellow-800 border-yellow-600",
                  invoice.status === "overdue" && "bg-red-100 text-red-800 border-red-600"
                )}
              >
                {invoice.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
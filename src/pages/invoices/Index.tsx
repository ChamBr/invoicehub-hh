import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { NewInvoiceDialog } from "@/components/invoices/NewInvoiceDialog";
import { Invoice, invoiceStatusConfig, InvoiceStatus } from "@/components/invoices/types";

const InvoicesIndex = () => {
  const navigate = useNavigate();
  const [pageTitle, setPageTitle] = useState("InvoiceHub - Faturas");
  const [isNewInvoiceOpen, setIsNewInvoiceOpen] = useState(false);

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  const { data: invoices, isLoading } = useQuery({
    queryKey: ["invoices"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("invoices")
        .select(`
          *,
          customer:customers(name)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Invoice[];
    },
  });

  const renderStatusIcon = (status: InvoiceStatus) => {
    const iconName = invoiceStatusConfig[status].icon;
    const Icon = LucideIcons[iconName as keyof typeof LucideIcons];
    return <Icon className="h-4 w-4 mr-1" />;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Faturas</h1>
          <Button onClick={() => setIsNewInvoiceOpen(true)} className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            Nova Fatura
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices?.map((invoice) => (
                <TableRow 
                  key={invoice.id} 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => navigate(`/invoices/${invoice.id}`)}
                >
                  <TableCell>{invoice.customer?.name}</TableCell>
                  <TableCell>
                    {new Date(invoice.created_at).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell>
                    {new Date(invoice.due_date).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "flex w-fit items-center gap-1",
                        invoiceStatusConfig[invoice.status].color
                      )}
                    >
                      {renderStatusIcon(invoice.status)}
                      <span>{invoiceStatusConfig[invoice.status].label}</span>
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(invoice.total)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <NewInvoiceDialog 
        open={isNewInvoiceOpen} 
        onOpenChange={setIsNewInvoiceOpen} 
      />
    </div>
  );
};

export default InvoicesIndex;
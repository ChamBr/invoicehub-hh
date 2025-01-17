import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "./StatusBadge";
import { type Invoice } from "./types";
import { InvoiceViewDialog } from "./InvoiceViewDialog";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface InvoiceListProps {
  invoices: Invoice[];
}

export function InvoiceList({ invoices }: InvoiceListProps) {
  const navigate = useNavigate();
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const { data: currentSubscriber } = useQuery({
    queryKey: ["current-subscriber"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const { data: subscriberUser, error: subscriberError } = await supabase
        .from("subscriber_users")
        .select("subscriber_id")
        .eq("user_id", user.id)
        .single();

      if (subscriberError) throw subscriberError;
      return subscriberUser;
    },
  });

  const { data: invoicesList, isLoading } = useQuery({
    queryKey: ["invoices", currentSubscriber?.subscriber_id],
    queryFn: async () => {
      if (!currentSubscriber?.subscriber_id) return [];

      const { data, error } = await supabase
        .from("invoices")
        .select(`
          *,
          customer:customers(name),
          items:invoice_items(*)
        `)
        .eq("subscriber_id", currentSubscriber.subscriber_id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      return data.map(invoice => ({
        ...invoice,
        items: (invoice.items || []).map(item => ({
          id: item.id,
          productId: item.product_id,
          description: item.description,
          quantity: item.quantity,
          price: item.price,
          hasTax: item.has_tax || false,
          total: item.total
        }))
      })) as Invoice[];
    },
    enabled: !!currentSubscriber?.subscriber_id,
  });

  const handleRowClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsViewDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Número</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Vencimento</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(invoicesList || []).map((invoice) => (
            <TableRow
              key={invoice.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleRowClick(invoice)}
            >
              <TableCell>#{invoice.id.slice(0, 8)}</TableCell>
              <TableCell>{invoice.customer?.name}</TableCell>
              <TableCell>
                {new Date(invoice.created_at).toLocaleDateString("pt-BR")}
              </TableCell>
              <TableCell>
                {new Date(invoice.due_date).toLocaleDateString("pt-BR")}
              </TableCell>
              <TableCell>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(invoice.total)}
              </TableCell>
              <TableCell>
                <StatusBadge status={invoice.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <InvoiceViewDialog
        invoice={selectedInvoice}
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
      />
    </>
  );
}
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Invoice } from "./types";
import { InvoiceDetailsItems } from "./InvoiceDetailsItems";
import { StatusBadge } from "./StatusBadge";
import { InvoiceActions } from "./InvoiceActions";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface InvoiceViewDialogProps {
  invoice: Invoice | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InvoiceViewDialog({ invoice, open, onOpenChange }: InvoiceViewDialogProps) {
  const [currentStatus, setCurrentStatus] = useState<Invoice['status']>();

  if (!invoice) return null;

  const handleStatusChange = async (newStatus: Invoice['status']) => {
    try {
      const { error } = await supabase
        .from('invoices')
        .update({ status: newStatus })
        .eq('id', invoice.id);

      if (error) throw error;
      setCurrentStatus(newStatus);
    } catch (error) {
      console.error('Error updating invoice status:', error);
    }
  };

  const handleEdit = () => {
    onOpenChange(false);
    // Aqui você pode adicionar a navegação para a página de edição
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Fatura #{invoice.id.slice(0, 8)}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium">Cliente</h3>
              <p className="text-muted-foreground">{invoice.customer?.name}</p>
            </div>
            <StatusBadge status={currentStatus || invoice.status} />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Data de Emissão</p>
                <p className="font-medium">
                  {new Date(invoice.created_at).toLocaleDateString("pt-BR")}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Data de Vencimento</p>
                <p className="font-medium">
                  {new Date(invoice.due_date).toLocaleDateString("pt-BR")}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="font-medium">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(invoice.total)}
                </p>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Itens</h3>
            <InvoiceDetailsItems items={invoice.items || []} />
          </div>

          {invoice.notes && (
            <div>
              <h3 className="text-lg font-medium mb-2">Observações</h3>
              <p className="text-muted-foreground">{invoice.notes}</p>
            </div>
          )}

          <div className="pt-4 border-t">
            <InvoiceActions
              status={currentStatus || invoice.status}
              invoiceId={invoice.id}
              onEdit={handleEdit}
              onStatusChange={handleStatusChange}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
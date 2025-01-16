import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Invoice } from "../types";
import { InvoiceHeader } from "./InvoiceHeader";
import { InvoiceInfo } from "./InvoiceInfo";
import { InvoiceContent } from "./InvoiceContent";
import { InvoiceActions } from "../InvoiceActions";
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
        <InvoiceHeader invoice={invoice} currentStatus={currentStatus} />
        
        <div className="space-y-6">
          <InvoiceInfo invoice={invoice} />
          <InvoiceContent invoice={invoice} />

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
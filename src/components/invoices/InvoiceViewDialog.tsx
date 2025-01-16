import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Invoice } from "./types";
import { InvoiceHeader } from "./InvoiceViewDialog/InvoiceHeader";
import { InvoiceInfo } from "./InvoiceViewDialog/InvoiceInfo";
import { InvoiceContent } from "./InvoiceViewDialog/InvoiceContent";
import { InvoiceActions } from "./InvoiceActions";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface InvoiceViewDialogProps {
  invoice: Invoice | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InvoiceViewDialog({ invoice, open, onOpenChange }: InvoiceViewDialogProps) {
  const [currentStatus, setCurrentStatus] = useState<Invoice['status']>(invoice?.status);
  const [isEditing, setIsEditing] = useState(false);

  const { data: invoiceWithItems } = useQuery({
    queryKey: ["invoice", invoice?.id],
    queryFn: async () => {
      if (!invoice) return null;
      
      const { data, error } = await supabase
        .from("invoices")
        .select(`
          *,
          customer:customers(name),
          items:invoice_items(
            id,
            product_id,
            description,
            quantity,
            price,
            total,
            has_tax
          )
        `)
        .eq("id", invoice.id)
        .single();

      if (error) throw error;

      return {
        ...data,
        items: data.items.map((item: any) => ({
          id: item.id,
          productId: item.product_id,
          description: item.description,
          quantity: item.quantity,
          price: item.price,
          total: item.total,
          hasTax: item.has_tax
        }))
      } as Invoice;
    },
    enabled: !!invoice,
  });

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
    setIsEditing(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <InvoiceHeader 
          invoice={invoiceWithItems || invoice} 
          currentStatus={currentStatus || invoice.status} 
        />
        
        <div className="space-y-6">
          <InvoiceInfo invoice={invoiceWithItems || invoice} />
          <InvoiceContent 
            invoice={invoiceWithItems || invoice} 
            isEditing={isEditing}
          />

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
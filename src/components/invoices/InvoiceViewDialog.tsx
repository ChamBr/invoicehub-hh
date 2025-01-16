import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Invoice, InvoiceItem } from "./types";
import { InvoiceHeader } from "./InvoiceViewDialog/InvoiceHeader";
import { InvoiceInfo } from "./InvoiceViewDialog/InvoiceInfo";
import { InvoiceContent } from "./InvoiceViewDialog/InvoiceContent";
import { InvoiceActions } from "./InvoiceActions";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { calculateTotal } from "./utils";

interface InvoiceViewDialogProps {
  invoice: Invoice | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InvoiceViewDialog({ invoice, open, onOpenChange }: InvoiceViewDialogProps) {
  const [currentStatus, setCurrentStatus] = useState<Invoice['status']>(invoice?.status);
  const [isEditing, setIsEditing] = useState(false);
  const [editedItems, setEditedItems] = useState<InvoiceItem[]>([]);
  const { toast } = useToast();

  const { data: invoiceWithItems, refetch } = useQuery({
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

  const handleStatusChange = async (newStatus: Invoice['status']) => {
    try {
      const { error } = await supabase
        .from('invoices')
        .update({ status: newStatus })
        .eq('id', invoice!.id);

      if (error) throw error;
      setCurrentStatus(newStatus);
    } catch (error) {
      console.error('Error updating invoice status:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedItems(invoiceWithItems?.items || []);
  };

  const handleSaveEdit = async () => {
    if (!invoice) return;

    try {
      // Atualizar os itens da fatura
      const { error: itemsError } = await supabase
        .from('invoice_items')
        .upsert(
          editedItems.map(item => ({
            id: item.id,
            invoice_id: invoice.id,
            product_id: item.productId,
            description: item.description,
            quantity: item.quantity,
            price: item.price,
            total: item.total,
            has_tax: item.hasTax
          }))
        );

      if (itemsError) throw itemsError;

      // Atualizar o total da fatura
      const newTotal = calculateTotal(editedItems);
      const { error: invoiceError } = await supabase
        .from('invoices')
        .update({ total: newTotal })
        .eq('id', invoice.id);

      if (invoiceError) throw invoiceError;

      await refetch();
      setIsEditing(false);
      
      toast({
        title: "Sucesso",
        description: "Fatura atualizada com sucesso",
      });
    } catch (error) {
      console.error('Error updating invoice:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Ocorreu um erro ao atualizar a fatura",
      });
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedItems([]);
  };

  if (!invoice) return null;

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
            items={isEditing ? editedItems : undefined}
            onItemsChange={setEditedItems}
          />

          <div className="flex justify-between items-center pt-4 border-t">
            {isEditing ? (
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleCancelEdit}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveEdit}>
                  Salvar Alterações
                </Button>
              </div>
            ) : (
              <InvoiceActions
                status={currentStatus || invoice.status}
                invoiceId={invoice.id}
                onEdit={handleEdit}
                onStatusChange={handleStatusChange}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
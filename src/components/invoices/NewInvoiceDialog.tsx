import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CustomerSelect from "./CustomerSelect";
import InvoiceItems from "./InvoiceItems";
import InvoiceSummary from "./InvoiceSummary";
import { NewCustomerDialog } from "./NewCustomerDialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { calculateTotal } from "./utils";
import { InvoiceItem } from "./types";
import { InvoiceViewDialog } from "./InvoiceViewDialog";
import { TemplateSelector } from "./templates/TemplateSelector";

interface NewInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewInvoiceDialog({ open, onOpenChange }: NewInvoiceDialogProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [isNewCustomerDialogOpen, setIsNewCustomerDialogOpen] = useState(false);
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [createdInvoice, setCreatedInvoice] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>();

  const handleCustomerSelect = (customerId: string) => {
    setSelectedCustomer(customerId);
  };

  const handleAddItem = (item: InvoiceItem) => {
    setItems([...items, item]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleUpdateItem = (index: number, updatedItem: InvoiceItem) => {
    setItems(items.map((item, i) => (i === index ? updatedItem : item)));
  };

  const handleNewCustomerSuccess = () => {
    setIsNewCustomerDialogOpen(false);
  };

  const handleSubmit = async (status: 'draft' | 'created') => {
    if (!selectedCustomer) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Por favor, selecione um cliente.",
      });
      return;
    }

    if (items.length === 0) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Adicione pelo menos um item à fatura.",
      });
      return;
    }

    try {
      const { data: invoice, error: invoiceError } = await supabase
        .from("invoices")
        .insert({
          customer_id: selectedCustomer,
          status: status,
          due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          total: calculateTotal(items),
          template_id: selectedTemplate, // Adicionado o template_id
        })
        .select()
        .single();

      if (invoiceError) throw invoiceError;

      const invoiceItems = items.map((item) => ({
        invoice_id: invoice.id,
        product_id: item.productId || null,
        description: item.description,
        quantity: item.quantity,
        price: item.price,
        total: item.total,
      }));

      const { error: itemsError } = await supabase
        .from("invoice_items")
        .insert(invoiceItems);

      if (itemsError) throw itemsError;

      toast({
        title: "Sucesso",
        description: status === 'draft' 
          ? "Fatura salva como rascunho!"
          : "Fatura criada com sucesso!",
      });

      if (status === 'created') {
        setCreatedInvoice(invoice);
        setIsViewDialogOpen(true);
      } else {
        onOpenChange(false);
        navigate(`/invoices/${invoice.id}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Erro ao criar fatura",
        description: "Ocorreu um erro ao criar a fatura. Tente novamente.",
      });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Nova Fatura</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <CustomerSelect
                value={selectedCustomer}
                onSelect={handleCustomerSelect}
                onNewCustomer={() => setIsNewCustomerDialogOpen(true)}
              />

              {selectedCustomer && (
                <>
                  <TemplateSelector
                    value={selectedTemplate}
                    onChange={setSelectedTemplate}
                  />

                  <InvoiceItems
                    items={items}
                    onAdd={handleAddItem}
                    onRemove={handleRemoveItem}
                    onUpdate={handleUpdateItem}
                  />

                  <InvoiceSummary items={items} />

                  <div className="flex justify-end gap-4">
                    <Button
                      variant="outline"
                      onClick={() => onOpenChange(false)}
                    >
                      Cancelar
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleSubmit('draft')}
                    >
                      Salvar como Rascunho
                    </Button>
                    <Button onClick={() => handleSubmit('created')}>
                      Salvar e Gerar Fatura
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>

          <NewCustomerDialog
            open={isNewCustomerDialogOpen}
            onOpenChange={setIsNewCustomerDialogOpen}
            onSuccess={handleNewCustomerSuccess}
          />
        </DialogContent>
      </Dialog>

      {createdInvoice && (
        <InvoiceViewDialog
          invoice={createdInvoice}
          open={isViewDialogOpen}
          onOpenChange={(open) => {
            setIsViewDialogOpen(open);
            if (!open) {
              onOpenChange(false);
              navigate(`/invoices/${createdInvoice.id}`);
            }
          }}
        />
      )}
    </>
  );
}

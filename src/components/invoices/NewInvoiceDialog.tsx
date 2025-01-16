import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CustomerSelect from "./CustomerSelect";
import InvoiceItems from "./InvoiceItems";
import InvoiceSummary from "./InvoiceSummary";
import { NewCustomerDialog } from "./NewCustomerDialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InvoiceViewDialog } from "./InvoiceViewDialog";
import { TemplateSelector } from "./templates/TemplateSelector";
import { useInvoiceCreation } from "./hooks/useInvoiceCreation";

interface NewInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewInvoiceDialog({ open, onOpenChange }: NewInvoiceDialogProps) {
  const [isNewCustomerDialogOpen, setIsNewCustomerDialogOpen] = useState(false);
  const {
    selectedCustomer,
    items,
    createdInvoice,
    isViewDialogOpen,
    selectedTemplate,
    setSelectedTemplate,
    setIsViewDialogOpen,
    handleCustomerSelect,
    handleAddItem,
    handleRemoveItem,
    handleUpdateItem,
    handleSubmit,
  } = useInvoiceCreation();

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
            onSuccess={() => setIsNewCustomerDialogOpen(false)}
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
              window.location.href = `/invoices/${createdInvoice.id}`;
            }
          }}
        />
      )}
    </>
  );
}
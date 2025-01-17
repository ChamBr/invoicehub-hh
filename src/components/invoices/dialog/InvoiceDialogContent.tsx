import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CustomerSelect from "../CustomerSelect";
import InvoiceItems from "../InvoiceItems";
import InvoiceSummary from "../InvoiceSummary";
import { NewCustomerDialog } from "../NewCustomerDialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { useSubscriber } from "./SubscriberContext";
import { useInvoiceCreation } from "../hooks/useInvoiceCreation";

interface InvoiceDialogContentProps {
  onOpenChange: (open: boolean) => void;
}

export const InvoiceDialogContent = ({ onOpenChange }: InvoiceDialogContentProps) => {
  const [isNewCustomerDialogOpen, setIsNewCustomerDialogOpen] = useState(false);
  const { subscriber_id } = useSubscriber();
  
  const {
    selectedCustomer,
    items,
    activeTemplate,
    handleCustomerSelect,
    handleAddItem,
    handleRemoveItem,
    handleUpdateItem,
    handleSubmit,
  } = useInvoiceCreation(subscriber_id);

  return (
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
            subscriberId={subscriber_id}
          />

          {selectedCustomer && (
            <>
              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-medium text-emerald-900">
                      Template da Fatura
                    </h4>
                    <p className="text-sm text-emerald-700">
                      {activeTemplate?.name || "Template Padrão"}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                    onClick={() => onOpenChange(false)}
                  >
                    <PencilIcon className="h-4 w-4 mr-2" />
                    Alterar Template
                  </Button>
                </div>
              </div>

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
        subscriberId={subscriber_id}
        onSuccess={(customerId) => {
          handleCustomerSelect(customerId);
          setIsNewCustomerDialogOpen(false);
        }}
      />
    </DialogContent>
  );
};
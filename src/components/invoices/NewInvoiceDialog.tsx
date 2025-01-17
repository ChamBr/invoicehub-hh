import { Dialog } from "@/components/ui/dialog";
import { InvoiceViewDialog } from "./InvoiceViewDialog";
import { useInvoiceCreation } from "./hooks/useInvoiceCreation";
import { SubscriberContext } from "./dialog/SubscriberContext";
import { useSubscriberQuery } from "./dialog/useSubscriberQuery";
import { InvoiceDialogContent } from "./dialog/InvoiceDialogContent";

interface NewInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewInvoiceDialog({ open, onOpenChange }: NewInvoiceDialogProps) {
  const { data: currentSubscriber } = useSubscriberQuery();
  const { createdInvoice, isViewDialogOpen, setIsViewDialogOpen } = useInvoiceCreation(currentSubscriber?.subscriber_id);

  return (
    <SubscriberContext.Provider value={{ subscriber_id: currentSubscriber?.subscriber_id }}>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <InvoiceDialogContent onOpenChange={onOpenChange} />
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
    </SubscriberContext.Provider>
  );
}
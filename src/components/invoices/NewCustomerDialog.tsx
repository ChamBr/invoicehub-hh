import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CustomerForm from "./CustomerForm";

interface NewCustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (customerId: string) => void;
  subscriberId?: string;
}

export function NewCustomerDialog({
  open,
  onOpenChange,
  onSuccess,
  subscriberId,
}: NewCustomerDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Cliente</DialogTitle>
        </DialogHeader>
        <CustomerForm
          onSuccess={(customerId: string) => {
            if (onSuccess) onSuccess(customerId);
          }}
          onCancel={() => onOpenChange(false)}
          subscriberId={subscriberId}
        />
      </DialogContent>
    </Dialog>
  );
}
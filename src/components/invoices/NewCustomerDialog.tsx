import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CustomerForm } from "@/components/customers/CustomerForm";

interface NewCustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (customerId: string) => void;
  subscriberId?: string;
}

export const NewCustomerDialog = ({
  open,
  onOpenChange,
  onSuccess,
  subscriberId,
}: NewCustomerDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
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
};
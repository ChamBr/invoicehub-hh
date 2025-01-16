import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CustomerForm } from "@/components/customers/CustomerForm";

interface NewCustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (customerId: string) => void;
}

const NewCustomerDialog = ({
  open,
  onOpenChange,
  onSuccess,
}: NewCustomerDialogProps) => {
  const handleSuccess = () => {
    // Aqui podemos pegar o ID do cliente recém-criado através do contexto ou estado global
    // Por enquanto, vamos simular um ID
    const newCustomerId = "temp-id"; // Isso será substituído pelo ID real do cliente
    onSuccess(newCustomerId);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Novo Cliente</DialogTitle>
        </DialogHeader>
        <CustomerForm
          onSuccess={handleSuccess}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default NewCustomerDialog;
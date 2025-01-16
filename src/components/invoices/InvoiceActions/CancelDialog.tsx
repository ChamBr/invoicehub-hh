import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { InvoiceStatus } from "../types";

interface CancelDialogProps {
  status: InvoiceStatus;
  onCancel: () => Promise<void>;
}

export const CancelDialog = ({ status, onCancel }: CancelDialogProps) => {
  if (status === "draft" || status === "cancelled") return null;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <XCircle className="h-4 w-4 mr-2" />
          Cancelar Fatura
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancelar Fatura</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja cancelar esta fatura? Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Não</AlertDialogCancel>
          <AlertDialogAction onClick={onCancel}>
            Sim, cancelar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
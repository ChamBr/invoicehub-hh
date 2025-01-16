import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { FileEdit, Send, FileText } from "lucide-react";
import { InvoiceStatus } from "./types";

interface InvoiceActionsProps {
  status: InvoiceStatus;
  onEdit: () => void;
  onSend: () => void;
  onGeneratePDF: () => void;
  onCancel: () => void;
}

export const InvoiceActions = ({
  status,
  onEdit,
  onSend,
  onGeneratePDF,
  onCancel,
}: InvoiceActionsProps) => {
  const canEdit = status === "draft" || status === "created";
  const canSendOrPrint = status === "created";
  const showCancelOption = status !== "draft" && status !== "cancelled";

  return (
    <div className="flex gap-2">
      {canEdit && (
        <Button variant="outline" onClick={onEdit}>
          <FileEdit className="h-4 w-4 mr-2" />
          {status === "draft" ? "Editar" : "Voltar para Rascunho"}
        </Button>
      )}

      {canSendOrPrint && (
        <>
          <Button onClick={onSend}>
            <Send className="h-4 w-4 mr-2" />
            Enviar
          </Button>
          <Button variant="outline" onClick={onGeneratePDF}>
            <FileText className="h-4 w-4 mr-2" />
            Gerar PDF
          </Button>
        </>
      )}

      {showCancelOption && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Cancelar Fatura</Button>
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
      )}
    </div>
  );
};
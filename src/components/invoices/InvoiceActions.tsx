import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { FileEdit, Send, FileText } from "lucide-react";
import { InvoiceStatus } from "./types";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface InvoiceActionsProps {
  status: InvoiceStatus;
  invoiceId: string;
  onEdit: () => void;
  onStatusChange: (newStatus: InvoiceStatus) => Promise<void>;
}

export const InvoiceActions = ({
  status,
  invoiceId,
  onEdit,
  onStatusChange,
}: InvoiceActionsProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const canEdit = status === "draft" || status === "created";
  const canSendOrPrint = status === "created";
  const showCancelOption = status !== "draft" && status !== "cancelled";

  const handleGeneratePDF = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/invoice-actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceId, action: "generate-pdf" }),
      });

      if (!response.ok) throw new Error("Falha ao gerar PDF");

      const { pdfUrl } = await response.json();
      window.open(pdfUrl, "_blank");

      toast({
        title: "Sucesso",
        description: "PDF gerado com sucesso",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Ocorreu um erro ao gerar o PDF",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/invoice-actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceId, action: "send" }),
      });

      if (!response.ok) throw new Error("Falha ao enviar fatura");

      await onStatusChange("sent");
      
      toast({
        title: "Sucesso",
        description: "Fatura enviada com sucesso",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Ocorreu um erro ao enviar a fatura",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
          <Button onClick={handleSend} disabled={isLoading}>
            <Send className="h-4 w-4 mr-2" />
            Enviar
          </Button>
          <Button variant="outline" onClick={handleGeneratePDF} disabled={isLoading}>
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
              <AlertDialogAction onClick={() => onStatusChange("cancelled")}>
                Sim, cancelar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};
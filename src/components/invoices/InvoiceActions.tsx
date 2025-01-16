import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { FileEdit, Send, FileText, XCircle } from "lucide-react";
import { InvoiceStatus } from "./types";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface InvoiceActionsProps {
  status: InvoiceStatus;
  invoiceId: string;
  onEdit: () => void;
  onStatusChange: (newStatus: InvoiceStatus) => Promise<void>;
  pdfUrl?: string | null;
  emailSentAt?: string | null;
}

export const InvoiceActions = ({
  status,
  invoiceId,
  onEdit,
  onStatusChange,
  pdfUrl,
  emailSentAt,
}: InvoiceActionsProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

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

      await onStatusChange("pending");

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

      await onStatusChange("pending");
      
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

  const renderActionButtons = () => {
    switch (status) {
      case "draft":
        return (
          <Button variant="outline" onClick={onEdit}>
            <FileEdit className="h-4 w-4 mr-2" />
            Editar Rascunho
          </Button>
        );
      
      case "created":
        return (
          <div className="flex gap-2">
            <Button variant="outline" onClick={onEdit}>
              <FileEdit className="h-4 w-4 mr-2" />
              Voltar para Rascunho
            </Button>
            <Button onClick={handleSend} disabled={isLoading}>
              <Send className="h-4 w-4 mr-2" />
              Enviar
            </Button>
            <Button variant="outline" onClick={handleGeneratePDF} disabled={isLoading}>
              <FileText className="h-4 w-4 mr-2" />
              Gerar PDF
            </Button>
          </div>
        );
      
      case "pending":
        return (
          <div className="flex gap-2">
            {!emailSentAt && (
              <Button onClick={handleSend} disabled={isLoading}>
                <Send className="h-4 w-4 mr-2" />
                Reenviar
              </Button>
            )}
            {pdfUrl ? (
              <Button variant="outline" onClick={() => window.open(pdfUrl, "_blank")}>
                <FileText className="h-4 w-4 mr-2" />
                Ver PDF
              </Button>
            ) : (
              <Button variant="outline" onClick={handleGeneratePDF} disabled={isLoading}>
                <FileText className="h-4 w-4 mr-2" />
                Gerar PDF
              </Button>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex gap-2 justify-between">
      <div>{renderActionButtons()}</div>
      
      {status !== "draft" && status !== "cancelled" && (
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
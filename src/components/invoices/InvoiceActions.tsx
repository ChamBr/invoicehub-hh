import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { InvoiceStatus } from "./types";
import { ActionButtons } from "./InvoiceActions/ActionButtons";
import { CancelDialog } from "./InvoiceActions/CancelDialog";

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

  const handleCancel = async () => {
    await onStatusChange("cancelled");
  };

  return (
    <div className="flex gap-2 justify-between">
      <ActionButtons
        status={status}
        isLoading={isLoading}
        emailSentAt={emailSentAt}
        pdfUrl={pdfUrl}
        onEdit={onEdit}
        onSend={handleSend}
        onGeneratePDF={handleGeneratePDF}
      />
      
      <CancelDialog 
        status={status}
        onCancel={handleCancel}
      />
    </div>
  );
};
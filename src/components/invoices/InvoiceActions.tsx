import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { InvoiceStatus } from "./types";
import { ActionButtons } from "./InvoiceActions/ActionButtons";
import { CancelDialog } from "./InvoiceActions/CancelDialog";
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
      const { data, error } = await supabase.functions.invoke("invoice-actions", {
        body: { invoiceId, action: "generate-pdf" },
      });

      if (error) throw error;

      const { pdfUrl } = data;
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
      const { error } = await supabase.functions.invoke("invoice-actions", {
        body: { invoiceId, action: "send" },
      });

      if (error) throw error;

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

  const handleGenerateInvoice = async () => {
    setIsLoading(true);
    try {
      await onStatusChange("created");
      
      toast({
        title: "Sucesso",
        description: "Fatura gerada com sucesso",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Ocorreu um erro ao gerar a fatura",
      });
    } finally {
      setIsLoading(false);
    }
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
        onGenerateInvoice={handleGenerateInvoice}
      />
      
      <CancelDialog 
        status={status}
        onCancel={handleCancel}
      />
    </div>
  );
};
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { InvoiceStatus } from "../types";

interface UseInvoiceActionsProps {
  invoiceId: string;
  onStatusChange: (newStatus: InvoiceStatus) => Promise<void>;
}

export const useInvoiceActions = ({ invoiceId, onStatusChange }: UseInvoiceActionsProps) => {
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

  const handleMarkAsPaid = async () => {
    setIsLoading(true);
    try {
      await onStatusChange("paid");
      
      toast({
        title: "Sucesso",
        description: "Fatura marcada como paga com sucesso",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Ocorreu um erro ao marcar a fatura como paga",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleGeneratePDF,
    handleSend,
    handleCancel,
    handleGenerateInvoice,
    handleMarkAsPaid,
  };
};
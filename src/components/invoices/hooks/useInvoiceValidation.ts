import { useToast } from "@/components/ui/use-toast";
import { InvoiceItem } from "../types";

export const useInvoiceValidation = () => {
  const { toast } = useToast();

  const validateInvoiceData = (selectedCustomer: string | null, items: InvoiceItem[], subscriberId?: string) => {
    if (!selectedCustomer) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Por favor, selecione um cliente.",
      });
      return false;
    }

    if (items.length === 0) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Adicione pelo menos um item à fatura.",
      });
      return false;
    }

    if (!subscriberId) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao identificar o assinante.",
      });
      return false;
    }

    return true;
  };

  return { validateInvoiceData };
};
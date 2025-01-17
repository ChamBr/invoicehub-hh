import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useActiveTemplate } from "./useActiveTemplate";
import { useInvoiceStore } from "@/stores/useInvoiceStore";
import { Invoice, InvoiceItem } from "@/stores/types/invoice";

export const useInvoiceCreation = (subscriberId?: string) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [createdInvoice, setCreatedInvoice] = useState<Invoice | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const { data: activeTemplate } = useActiveTemplate();
  const { 
    items, 
    addItem: handleAddItem, 
    removeItem: handleRemoveItem, 
    updateItem: handleUpdateItem,
    calculateTotal 
  } = useInvoiceStore();

  const handleCustomerSelect = (customerId: string) => {
    setSelectedCustomer(customerId);
  };

  const validateInvoiceData = () => {
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
        description: "ID do assinante não encontrado.",
      });
      return false;
    }

    return true;
  };

  const createInvoice = async (invoiceData: Invoice) => {
    const { data: invoice, error: invoiceError } = await supabase
      .from("invoices")
      .insert(invoiceData)
      .select()
      .single();

    if (invoiceError) throw invoiceError;
    return invoice;
  };

  const createInvoiceItems = async (invoiceId: string, items: InvoiceItem[]) => {
    const invoiceItems = items.map((item) => ({
      invoice_id: invoiceId,
      product_id: item.productId || null,
      description: item.description,
      quantity: item.quantity,
      price: item.price,
      total: item.total,
      has_tax: item.hasTax,
    }));

    const { error: itemsError } = await supabase
      .from("invoice_items")
      .insert(invoiceItems);

    if (itemsError) throw itemsError;
  };

  const handleSubmit = async (status: 'draft' | 'created') => {
    if (!validateInvoiceData()) return;

    try {
      const invoiceData: Invoice = {
        customer_id: selectedCustomer!,
        status,
        due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        total: calculateTotal(),
        template_id: activeTemplate?.id,
        subscriber_id: subscriberId,
        items: items
      };

      const invoice = await createInvoice(invoiceData);
      await createInvoiceItems(invoice.id, items);

      toast({
        title: "Sucesso",
        description: status === 'draft' 
          ? "Fatura salva como rascunho!"
          : "Fatura criada com sucesso!",
      });

      if (status === 'created') {
        setCreatedInvoice(invoice);
        setIsViewDialogOpen(true);
      } else {
        navigate(`/invoices/${invoice.id}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Erro ao criar fatura",
        description: "Ocorreu um erro ao criar a fatura. Tente novamente.",
      });
    }
  };

  return {
    selectedCustomer,
    items,
    createdInvoice,
    isViewDialogOpen,
    activeTemplate,
    setIsViewDialogOpen,
    handleCustomerSelect,
    handleAddItem,
    handleRemoveItem,
    handleUpdateItem,
    handleSubmit,
  };
};
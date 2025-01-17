import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useActiveTemplate } from "./useActiveTemplate";
import { Invoice, InvoiceItem } from "../types";

export const useInvoiceCreation = (subscriberId?: string) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [createdInvoice, setCreatedInvoice] = useState<Invoice | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [items, setItems] = useState<InvoiceItem[]>([]);

  const { data: activeTemplate } = useActiveTemplate();

  const handleCustomerSelect = (customerId: string) => {
    setSelectedCustomer(customerId);
  };

  const handleAddItem = (item: InvoiceItem) => {
    setItems([...items, item]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleUpdateItem = (index: number, updatedItem: InvoiceItem) => {
    setItems(items.map((item, i) => (i === index ? updatedItem : item)));
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => {
      const itemTotal = item.total;
      const taxAmount = item.hasTax ? itemTotal * 0.10 : 0;
      return sum + itemTotal + taxAmount;
    }, 0);
  };

  const handleSubmit = async (status: 'draft' | 'created') => {
    if (!selectedCustomer) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Por favor, selecione um cliente.",
      });
      return;
    }

    if (items.length === 0) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Adicione pelo menos um item à fatura.",
      });
      return;
    }

    try {
      const invoiceData = {
        customer_id: selectedCustomer,
        status,
        due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        total: calculateTotal(),
        template_id: activeTemplate?.id,
        subscriber_id: subscriberId,
      };

      const { data: invoice, error: invoiceError } = await supabase
        .from("invoices")
        .insert(invoiceData)
        .select()
        .single();

      if (invoiceError) throw invoiceError;

      const invoiceItems = items.map(item => ({
        invoice_id: invoice.id,
        product_id: item.productId,
        description: item.description,
        quantity: item.quantity,
        price: item.price,
        total: item.total,
        has_tax: item.hasTax
      }));

      const { error: itemsError } = await supabase
        .from("invoice_items")
        .insert(invoiceItems);

      if (itemsError) throw itemsError;

      const fullInvoice: Invoice = {
        ...invoice,
        items
      };

      setCreatedInvoice(fullInvoice);

      toast({
        title: "Sucesso",
        description: status === 'draft' 
          ? "Fatura salva como rascunho!"
          : "Fatura criada com sucesso!",
      });

      if (status === 'created') {
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
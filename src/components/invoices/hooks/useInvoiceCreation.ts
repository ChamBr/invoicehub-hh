import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { calculateTotal } from "../utils";
import { useActiveTemplate } from "./useActiveTemplate";
import { useInvoiceItems } from "./useInvoiceItems";
import { useInvoiceValidation } from "./useInvoiceValidation";

export const useInvoiceCreation = (subscriberId?: string) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [createdInvoice, setCreatedInvoice] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const { data: activeTemplate } = useActiveTemplate();
  const { items, handleAddItem, handleRemoveItem, handleUpdateItem } = useInvoiceItems();
  const { validateInvoiceData } = useInvoiceValidation();

  const handleCustomerSelect = (customerId: string) => {
    setSelectedCustomer(customerId);
  };

  const createInvoice = async (invoiceData: any) => {
    const { data: invoice, error: invoiceError } = await supabase
      .from("invoices")
      .insert(invoiceData)
      .select()
      .single();

    if (invoiceError) throw invoiceError;
    return invoice;
  };

  const createInvoiceItems = async (invoiceId: string) => {
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
    if (!validateInvoiceData(selectedCustomer, items, subscriberId)) return;

    try {
      const invoiceData = {
        customer_id: selectedCustomer!,
        status,
        due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        total: calculateTotal(items),
        template_id: activeTemplate?.id,
        subscriber_id: subscriberId,
      };

      const invoice = await createInvoice(invoiceData);
      await createInvoiceItems(invoice.id);

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
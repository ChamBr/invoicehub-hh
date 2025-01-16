import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { InvoiceItem } from "../types";
import { calculateTotal } from "../utils";
import { useQuery } from "@tanstack/react-query";

export const useInvoiceCreation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [createdInvoice, setCreatedInvoice] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>();

  // Buscar o template ativo do perfil da empresa
  const { data: activeTemplate } = useQuery({
    queryKey: ["active-template"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const { data: profile } = await supabase
        .from("company_profiles")
        .select(`
          active_template_id,
          invoice_templates (
            id,
            name,
            description
          )
        `)
        .eq("user_id", user.id)
        .single();

      if (!profile?.active_template_id) return null;

      return {
        id: profile.active_template_id,
        ...profile.invoice_templates
      };
    },
  });

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
      const { data: invoice, error: invoiceError } = await supabase
        .from("invoices")
        .insert({
          customer_id: selectedCustomer,
          status: status,
          due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          total: calculateTotal(items),
          template_id: activeTemplate?.id,
        })
        .select()
        .single();

      if (invoiceError) throw invoiceError;

      const invoiceItems = items.map((item) => ({
        invoice_id: invoice.id,
        product_id: item.productId || null,
        description: item.description,
        quantity: item.quantity,
        price: item.price,
        total: item.total,
      }));

      const { error: itemsError } = await supabase
        .from("invoice_items")
        .insert(invoiceItems);

      if (itemsError) throw itemsError;

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
    selectedTemplate,
    setSelectedTemplate,
    setIsViewDialogOpen,
    handleCustomerSelect,
    handleAddItem,
    handleRemoveItem,
    handleUpdateItem,
    handleSubmit,
  };
};
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { InvoiceItem } from "../types";
import { calculateTotal } from "../utils";
import { useQuery } from "@tanstack/react-query";

interface InvoiceData {
  customer_id: string;
  status: 'draft' | 'created';
  due_date: string;
  total: number;
  template_id?: string;
}

export const useInvoiceCreation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [createdInvoice, setCreatedInvoice] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

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
        .maybeSingle();

      if (!profile?.active_template_id) return null;

      return {
        id: profile.active_template_id,
        ...profile.invoice_templates
      };
    },
  });

  // Handlers para gerenciamento de items
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

  // Validações
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

    return true;
  };

  // Criação da fatura
  const createInvoice = async (invoiceData: InvoiceData) => {
    const { data: invoice, error: invoiceError } = await supabase
      .from("invoices")
      .insert(invoiceData)
      .select()
      .single();

    if (invoiceError) throw invoiceError;
    return invoice;
  };

  // Criação dos itens da fatura
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

  // Handler principal de submissão
  const handleSubmit = async (status: 'draft' | 'created') => {
    if (!validateInvoiceData()) return;

    try {
      const invoiceData: InvoiceData = {
        customer_id: selectedCustomer!,
        status,
        due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        total: calculateTotal(items),
        template_id: activeTemplate?.id,
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
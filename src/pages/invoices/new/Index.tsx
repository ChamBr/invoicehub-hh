import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import CustomerSelect from "./components/CustomerSelect";
import InvoiceItems from "./components/InvoiceItems";
import InvoiceSummary from "./components/InvoiceSummary";
import NewCustomerDialog from "./components/NewCustomerDialog";

const NewInvoice = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [isNewCustomerDialogOpen, setIsNewCustomerDialogOpen] = useState(false);
  const [items, setItems] = useState<InvoiceItem[]>([]);

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

  const handleSubmit = async () => {
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
        .insert([
          {
            customer_id: selectedCustomer,
            status: "draft",
            due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            total: calculateTotal(items),
          },
        ])
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
        description: "Fatura criada com sucesso!",
      });

      navigate("/invoices");
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Erro ao criar fatura",
        description: "Ocorreu um erro ao criar a fatura. Tente novamente.",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate("/invoices")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Nova Fatura</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <CustomerSelect
              value={selectedCustomer}
              onSelect={handleCustomerSelect}
              onNewCustomer={() => setIsNewCustomerDialogOpen(true)}
            />

            {selectedCustomer && (
              <>
                <InvoiceItems
                  items={items}
                  onAdd={handleAddItem}
                  onRemove={handleRemoveItem}
                  onUpdate={handleUpdateItem}
                />

                <InvoiceSummary items={items} />

                <div className="flex justify-end gap-4">
                  <Button
                    variant="outline"
                    onClick={() => navigate("/invoices")}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={handleSubmit}>
                    Criar Fatura
                  </Button>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <NewCustomerDialog
        open={isNewCustomerDialogOpen}
        onOpenChange={setIsNewCustomerDialogOpen}
        onSuccess={(customerId) => {
          setSelectedCustomer(customerId);
          setIsNewCustomerDialogOpen(false);
        }}
      />
    </div>
  );
};

export default NewInvoice;
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/invoices/StatusBadge";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";
import { InvoiceStatus } from "@/components/invoices/types";
import { InvoiceActions } from "@/components/invoices/InvoiceActions";
import { InvoiceDetailsItems } from "@/components/invoices/InvoiceDetailsItems";

export default function InvoiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: invoice, refetch } = useQuery({
    queryKey: ["invoice", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("invoices")
        .select(`
          *,
          customer:customers(name),
          items:invoice_items(
            id,
            description,
            quantity,
            price,
            total,
            has_tax
          )
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      
      // Transformar has_tax para hasTax para manter consistência com a interface
      const transformedData = {
        ...data,
        items: data.items?.map(item => ({
          ...item,
          hasTax: item.has_tax
        }))
      };

      return transformedData;
    },
  });

  const handleStatusChange = async (newStatus: InvoiceStatus) => {
    try {
      const { error } = await supabase
        .from("invoices")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Status da fatura atualizado com sucesso",
      });

      refetch();
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Ocorreu um erro ao atualizar o status da fatura",
      });
    }
  };

  const handleEdit = () => {
    if (invoice?.status === "draft") {
      navigate(`/invoices/${id}/edit`);
    } else {
      handleStatusChange("draft");
    }
  };

  if (!invoice) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={() => navigate("/invoices")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <StatusBadge status={invoice.status} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Fatura #{invoice.id.slice(0, 8)}</span>
            <InvoiceActions
              status={invoice.status}
              invoiceId={invoice.id}
              onEdit={handleEdit}
              onStatusChange={handleStatusChange}
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Cliente</h3>
              <p>{invoice.customer?.name}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Itens</h3>
              <InvoiceDetailsItems items={invoice.items} />
            </div>

            <div className="flex justify-end">
              <div className="w-72">
                <div className="flex justify-between py-2">
                  <span>Total</span>
                  <span className="font-medium">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(invoice.total)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
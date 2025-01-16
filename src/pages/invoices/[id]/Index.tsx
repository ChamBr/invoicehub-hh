import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/invoices/StatusBadge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, FileEdit, Send, FilePdf } from "lucide-react";
import { InvoiceStatus } from "@/components/invoices/types";

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
          items:invoice_items(*)
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
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
      // Implementar edição
      toast({
        title: "Info",
        description: "Funcionalidade de edição será implementada em breve",
      });
    } else {
      handleStatusChange("draft");
    }
  };

  const handleSend = async () => {
    // Aqui você implementaria a lógica de envio
    await handleStatusChange("sent");
  };

  const handleGeneratePDF = () => {
    // Implementar geração de PDF
    toast({
      title: "Info",
      description: "Funcionalidade de geração de PDF será implementada em breve",
    });
  };

  if (!invoice) return null;

  const canEdit = invoice.status === "draft" || invoice.status === "created";
  const canSendOrPrint = invoice.status === "created";
  const showCancelOption = invoice.status !== "draft" && invoice.status !== "cancelled";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/invoices")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <StatusBadge status={invoice.status} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Fatura #{invoice.id.slice(0, 8)}</span>
            <div className="flex gap-2">
              {canEdit && (
                <Button
                  variant="outline"
                  onClick={handleEdit}
                >
                  <FileEdit className="h-4 w-4 mr-2" />
                  {invoice.status === "draft" ? "Editar" : "Voltar para Rascunho"}
                </Button>
              )}
              
              {canSendOrPrint && (
                <>
                  <Button onClick={handleSend}>
                    <Send className="h-4 w-4 mr-2" />
                    Enviar
                  </Button>
                  <Button variant="outline" onClick={handleGeneratePDF}>
                    <FilePdf className="h-4 w-4 mr-2" />
                    Gerar PDF
                  </Button>
                </>
              )}

              {showCancelOption && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      Cancelar Fatura
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Cancelar Fatura</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tem certeza que deseja cancelar esta fatura? Esta ação não pode ser desfeita.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Não</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleStatusChange("cancelled")}
                      >
                        Sim, cancelar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
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
              <div className="space-y-2">
                {invoice.items.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex justify-between p-2 bg-muted rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{item.description}</p>
                      <p className="text-sm text-muted-foreground">
                        Quantidade: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(item.total)}
                    </p>
                  </div>
                ))}
              </div>
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
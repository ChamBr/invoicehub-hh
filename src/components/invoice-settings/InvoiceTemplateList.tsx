import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, FileText } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { InvoiceTemplate } from "@/components/invoices/templates/types";

const SAMPLE_COMPANY = {
  name: "InvoiceHub",
  address: "Rua da Tecnologia, 123",
  city: "São Paulo",
  state: "SP",
  zipCode: "01234-567",
  phone: "(11) 98765-4321",
  email: "contato@invoicehub.com.br",
  website: "www.invoicehub.com.br",
};

const SAMPLE_CUSTOMER = {
  name: "João da Silva",
  company: "Empresa Exemplo Ltda",
  address: "Avenida do Cliente, 456",
  city: "São Paulo",
  state: "SP",
  zipCode: "04567-890",
  phone: "(11) 91234-5678",
  email: "joao@exemplo.com.br",
};

const SAMPLE_ITEMS = [
  {
    description: "Plano Professional",
    quantity: 1,
    price: 99.90,
    total: 99.90,
  },
  {
    description: "Usuários Adicionais (pacote de 5)",
    quantity: 2,
    price: 49.90,
    total: 99.80,
  },
  {
    description: "Armazenamento Extra 50GB",
    quantity: 1,
    price: 29.90,
    total: 29.90,
  },
];

export const InvoiceTemplateList = () => {
  const [previewTemplate, setPreviewTemplate] = useState<InvoiceTemplate | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const { data: templates, isLoading } = useQuery({
    queryKey: ["invoice-templates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("invoice_templates")
        .select("*")
        .order("is_default", { ascending: false });

      if (error) throw error;
      return data as InvoiceTemplate[];
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  const total = SAMPLE_ITEMS.reduce((sum, item) => sum + item.total, 0);
  const tax = total * 0.10; // 10% de imposto
  const grandTotal = total + tax;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Templates de Fatura</h3>
      
      <ScrollArea className="h-[400px] rounded-md border p-4">
        <div className="space-y-4">
          {templates?.map((template) => (
            <Card key={template.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <FileText className="h-5 w-5 text-gray-500" />
                    <div>
                      <h3 className="font-medium">{template.name}</h3>
                      <p className="text-sm text-gray-500">{template.description}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setPreviewTemplate(template);
                      setIsPreviewOpen(true);
                    }}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Visualizar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              Visualização do Template: {previewTemplate?.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="p-6 border rounded-lg space-y-8" style={{
            fontFamily: previewTemplate?.content.body.fontFamily,
            fontSize: previewTemplate?.content.body.fontSize,
            lineHeight: previewTemplate?.content.body.lineHeight,
          }}>
            {/* Header */}
            <div className={`text-${previewTemplate?.content.header.alignment}`} style={{
              color: previewTemplate?.content.header.textColor,
              backgroundColor: previewTemplate?.content.header.backgroundColor,
              padding: "1.5rem",
              borderRadius: "0.5rem",
            }}>
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold mb-2">FATURA</h1>
                  <div className="text-sm space-y-1">
                    <p className="font-semibold">{SAMPLE_COMPANY.name}</p>
                    <p>{SAMPLE_COMPANY.address}</p>
                    <p>{SAMPLE_COMPANY.city}, {SAMPLE_COMPANY.state} - {SAMPLE_COMPANY.zipCode}</p>
                    <p>Tel: {SAMPLE_COMPANY.phone}</p>
                    <p>{SAMPLE_COMPANY.email}</p>
                  </div>
                </div>
                <div className="text-sm text-right space-y-1">
                  <p><strong>Fatura Nº:</strong> INV-2024001</p>
                  <p><strong>Data:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
                  <p><strong>Vencimento:</strong> {new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="border-b pb-4">
              <h2 className="font-semibold mb-2">Faturar Para:</h2>
              <div className="text-sm space-y-1">
                <p className="font-medium">{SAMPLE_CUSTOMER.name}</p>
                <p>{SAMPLE_CUSTOMER.company}</p>
                <p>{SAMPLE_CUSTOMER.address}</p>
                <p>{SAMPLE_CUSTOMER.city}, {SAMPLE_CUSTOMER.state} - {SAMPLE_CUSTOMER.zipCode}</p>
                <p>Tel: {SAMPLE_CUSTOMER.phone}</p>
                <p>{SAMPLE_CUSTOMER.email}</p>
              </div>
            </div>

            {/* Items */}
            <div>
              <table className="w-full">
                <thead className="bg-gray-50 text-sm">
                  <tr>
                    <th className="px-4 py-2 text-left">Descrição</th>
                    <th className="px-4 py-2 text-center">Qtd</th>
                    <th className="px-4 py-2 text-right">Valor Unit.</th>
                    <th className="px-4 py-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {SAMPLE_ITEMS.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-3">{item.description}</td>
                      <td className="px-4 py-3 text-center">{item.quantity}</td>
                      <td className="px-4 py-3 text-right">
                        {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {item.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="text-sm font-medium">
                  <tr>
                    <td colSpan={3} className="px-4 py-2 text-right">Subtotal:</td>
                    <td className="px-4 py-2 text-right">
                      {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="px-4 py-2 text-right">Impostos (10%):</td>
                    <td className="px-4 py-2 text-right">
                      {tax.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </td>
                  </tr>
                  <tr className="font-bold">
                    <td colSpan={3} className="px-4 py-2 text-right">Total:</td>
                    <td className="px-4 py-2 text-right">
                      {grandTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Footer */}
            <div className={`text-${previewTemplate?.content.footer.alignment} mt-8`}>
              {previewTemplate?.content.footer.showTerms && (
                <div className="text-sm text-gray-600 mb-4">
                  <h3 className="font-semibold mb-2">Termos e Condições</h3>
                  <p>1. Pagamento deve ser realizado em até 30 dias após a emissão da fatura.</p>
                  <p>2. Aceitamos pagamentos via PIX, transferência bancária ou cartão de crédito.</p>
                  <p>3. Em caso de dúvidas, entre em contato com nosso suporte.</p>
                </div>
              )}
              {previewTemplate?.content.footer.showSignature && (
                <div className="mt-8 pt-8 border-t">
                  <div className="w-48 mx-auto text-center">
                    _____________________
                    <div className="text-sm text-gray-600">Assinatura Autorizada</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
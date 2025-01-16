import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, FileText } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { InvoiceTemplate } from "@/components/invoices/templates/types";

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
          
          <div className="p-4 border rounded-lg" style={{
            fontFamily: previewTemplate?.content.body.fontFamily,
            fontSize: previewTemplate?.content.body.fontSize,
            lineHeight: previewTemplate?.content.body.lineHeight,
          }}>
            {/* Header */}
            <div className={`text-${previewTemplate?.content.header.alignment}`} style={{
              color: previewTemplate?.content.header.textColor
            }}>
              {previewTemplate?.content.header.showLogo && (
                <div className="mb-4">
                  [Logo da Empresa]
                </div>
              )}
              <h1 className="text-2xl font-bold">FATURA</h1>
            </div>

            {/* Body */}
            <div className="my-8">
              <div className={`border-${previewTemplate?.content.body.tableStyle} rounded-lg overflow-hidden`}>
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left">Item</th>
                      <th className="px-4 py-2 text-right">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2">Exemplo de Item</td>
                      <td className="px-4 py-2 text-right">R$ 100,00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer */}
            <div className={`text-${previewTemplate?.content.footer.alignment} mt-8`}>
              {previewTemplate?.content.footer.showTerms && (
                <div className="text-sm text-gray-600 mb-4">
                  Termos e Condições da Fatura
                </div>
              )}
              {previewTemplate?.content.footer.showSignature && (
                <div className="mt-8 pt-8 border-t">
                  <div className="w-48 mx-auto text-center">
                    _____________________
                    <div className="text-sm text-gray-600">Assinatura</div>
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
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, FileText } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { InvoiceTemplate } from "@/components/invoices/templates/types";
import { TemplatePreviewDialog } from "./template-preview/TemplatePreviewDialog";

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

      <TemplatePreviewDialog
        template={previewTemplate}
        open={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        sampleCompany={SAMPLE_COMPANY}
        sampleCustomer={SAMPLE_CUSTOMER}
        sampleItems={SAMPLE_ITEMS}
      />
    </div>
  );
};
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, FileText, Check } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { InvoiceTemplate } from "@/components/invoices/templates/types";
import { TemplatePreviewDialog } from "./template-preview/TemplatePreviewDialog";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

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
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: companyProfile } = useQuery({
    queryKey: ["company-profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const { data, error } = await supabase
        .from("company_profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

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

  const activateTemplate = useMutation({
    mutationFn: async (templateId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const { error } = await supabase
        .from("company_profiles")
        .update({ active_template_id: templateId })
        .eq("user_id", user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company-profile"] });
      toast({
        title: "Template ativado",
        description: "O template selecionado foi definido como padrão para suas faturas.",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao ativar template",
        description: "Não foi possível ativar o template selecionado.",
        variant: "destructive",
      });
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
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{template.name}</h3>
                        {template.id === companyProfile?.active_template_id && (
                          <Badge variant="secondary" className="text-xs">
                            Ativo
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{template.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
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
                    {template.id !== companyProfile?.active_template_id && (
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => activateTemplate.mutate(template.id)}
                        disabled={activateTemplate.isPending}
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Ativar
                      </Button>
                    )}
                  </div>
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InvoiceTemplate } from "./types";
import { cn } from "@/lib/utils";
import { PreviewCustomer } from "@/components/invoice-settings/template-preview/PreviewCustomer";
import { PreviewHeader } from "@/components/invoice-settings/template-preview/PreviewHeader";
import { PreviewItems } from "@/components/invoice-settings/template-preview/PreviewItems";
import { PreviewFooter } from "@/components/invoice-settings/template-preview/PreviewFooter";

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

interface TemplatePreviewProps {
  template: InvoiceTemplate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TemplatePreview = ({ template, open, onOpenChange }: TemplatePreviewProps) => {
  if (!template) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Visualização do Template: {template.name}</DialogTitle>
        </DialogHeader>
        
        <div className="p-6 border rounded-lg" style={{
          fontFamily: template.content.body.fontFamily,
          fontSize: template.content.body.fontSize,
          lineHeight: template.content.body.lineHeight,
        }}>
          <PreviewHeader content={template.content} company={SAMPLE_COMPANY} />
          <PreviewCustomer 
            customer={SAMPLE_CUSTOMER} 
            company={SAMPLE_COMPANY} 
            layout="vertical" 
          />
          <PreviewItems items={SAMPLE_ITEMS} />
          <PreviewFooter content={template.content} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
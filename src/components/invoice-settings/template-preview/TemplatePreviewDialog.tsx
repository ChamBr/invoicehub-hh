import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InvoiceTemplate } from "@/components/invoices/templates/types";
import { PreviewHeader } from "./PreviewHeader";
import { PreviewCustomer } from "./PreviewCustomer";
import { PreviewItems } from "./PreviewItems";
import { PreviewFooter } from "./PreviewFooter";

interface TemplatePreviewDialogProps {
  template: InvoiceTemplate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sampleCompany: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    email: string;
    website: string;
  };
  sampleCustomer: {
    name: string;
    company: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    email: string;
  };
  sampleItems: Array<{
    description: string;
    quantity: number;
    price: number;
    total: number;
  }>;
}

export const TemplatePreviewDialog = ({
  template,
  open,
  onOpenChange,
  sampleCompany,
  sampleCustomer,
  sampleItems
}: TemplatePreviewDialogProps) => {
  if (!template) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            Visualização do Template: {template.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-6 border rounded-lg space-y-8" style={{
          fontFamily: template.content.body.fontFamily,
          fontSize: template.content.body.fontSize,
          lineHeight: template.content.body.lineHeight,
        }}>
          <PreviewHeader content={template.content} company={sampleCompany} />
          <PreviewCustomer customer={sampleCustomer} />
          <PreviewItems items={sampleItems} />
          <PreviewFooter content={template.content} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
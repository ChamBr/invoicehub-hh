import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InvoiceTemplate } from "./types";

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
        
        <div className="p-4 border rounded-lg" style={{
          fontFamily: template.content.body.fontFamily,
          fontSize: template.content.body.fontSize,
          lineHeight: template.content.body.lineHeight,
        }}>
          {/* Header */}
          <div className={`text-${template.content.header.alignment}`} style={{
            color: template.content.header.textColor
          }}>
            {template.content.header.showLogo && (
              <div className="mb-4">
                [Logo da Empresa]
              </div>
            )}
            <h1 className="text-2xl font-bold">FATURA</h1>
          </div>

          {/* Body */}
          <div className="my-8">
            <div className={`border-${template.content.body.tableStyle} rounded-lg overflow-hidden`}>
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
          <div className={`text-${template.content.footer.alignment} mt-8`}>
            {template.content.footer.showTerms && (
              <div className="text-sm text-gray-600 mb-4">
                Termos e Condições da Fatura
              </div>
            )}
            {template.content.footer.showSignature && (
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
  );
};
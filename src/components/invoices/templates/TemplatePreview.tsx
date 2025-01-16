import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InvoiceTemplate } from "./types";
import { cn } from "@/lib/utils";

interface TemplatePreviewProps {
  template: InvoiceTemplate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TemplatePreview = ({ template, open, onOpenChange }: TemplatePreviewProps) => {
  if (!template) return null;

  const { content } = template;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Visualização do Template: {template.name}</DialogTitle>
        </DialogHeader>
        
        <div className="p-4 border rounded-lg" style={{
          fontFamily: content.body.fontFamily,
          fontSize: content.body.fontSize,
          lineHeight: content.body.lineHeight,
        }}>
          {/* Header */}
          <div 
            className={cn(
              "p-6 rounded-t-lg",
              content.header.alignment === 'space-between' ? "flex justify-between items-center" : `text-${content.header.alignment}`
            )}
            style={{
              backgroundColor: content.header.backgroundColor,
              color: content.header.textColor
            }}
          >
            {content.header.showLogo && (
              <div className="mb-4">
                [Logo da Empresa]
              </div>
            )}
            <h1 className="text-2xl font-bold">{content.header.title}</h1>
          </div>

          {/* Body */}
          <div className="my-8">
            <div className={cn(
              "rounded-lg overflow-hidden",
              content.body.tableStyle === 'modern' ? "shadow-lg" : "border"
            )}>
              <table className="w-full">
                <thead style={{
                  backgroundColor: content.body.headerBackgroundColor,
                  color: content.body.headerTextColor
                }}>
                  <tr>
                    <th className="px-4 py-2 text-left">Item</th>
                    {content.body.showHours && <th className="px-4 py-2 text-right">Horas</th>}
                    {content.body.showRate && <th className="px-4 py-2 text-right">Valor/Hora</th>}
                    <th className="px-4 py-2 text-right">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ backgroundColor: content.body.rowBackgroundColor }}>
                    <td className="px-4 py-2">Exemplo de Item</td>
                    {content.body.showHours && <td className="px-4 py-2 text-right">8</td>}
                    {content.body.showRate && <td className="px-4 py-2 text-right">R$ 100,00</td>}
                    <td className="px-4 py-2 text-right">R$ 800,00</td>
                  </tr>
                  <tr style={{ backgroundColor: content.body.alternateRowBackgroundColor }}>
                    <td className="px-4 py-2">Outro Item</td>
                    {content.body.showHours && <td className="px-4 py-2 text-right">4</td>}
                    {content.body.showRate && <td className="px-4 py-2 text-right">R$ 120,00</td>}
                    <td className="px-4 py-2 text-right">R$ 480,00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer */}
          <div className={`text-${content.footer.alignment} mt-8`}>
            {content.footer.includeTaxSummary && (
              <div className="text-sm text-gray-600 mb-4">
                <h4 className="font-medium mb-2">Resumo de Impostos</h4>
                <p>Subtotal: R$ 1.280,00</p>
                <p>Impostos (10%): R$ 128,00</p>
                <p className="font-medium">Total: R$ 1.408,00</p>
              </div>
            )}
            
            {content.footer.showTerms && (
              <div className="text-sm text-gray-600 mb-4">
                <h4 className="font-medium mb-2">Termos e Condições</h4>
                <p>Pagamento em até 30 dias após a emissão da fatura.</p>
              </div>
            )}

            {content.footer.includePaymentInstructions && (
              <div className="text-sm text-gray-600 mb-4">
                <h4 className="font-medium mb-2">Instruções de Pagamento</h4>
                <p>Banco: 001 - Banco do Brasil</p>
                <p>Agência: 1234-5</p>
                <p>Conta: 12345-6</p>
              </div>
            )}

            {content.footer.showSignature && (
              <div className="mt-8 pt-8 border-t">
                <div className="w-48 mx-auto text-center">
                  _____________________
                  <div className="text-sm text-gray-600">Assinatura</div>
                </div>
              </div>
            )}

            {content.footer.includeThankYouNote && (
              <div className="text-center mt-8 text-gray-600">
                Obrigado pela preferência!
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
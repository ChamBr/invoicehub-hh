import { Button } from "@/components/ui/button";
import { FileEdit, Send, FileText, CheckCircle2 } from "lucide-react";
import { InvoiceStatus } from "../types";

interface ActionButtonsProps {
  status: InvoiceStatus;
  isLoading: boolean;
  emailSentAt?: string | null;
  pdfUrl?: string | null;
  onEdit: () => void;
  onSend: () => Promise<void>;
  onGeneratePDF: () => Promise<void>;
  onGenerateInvoice: () => Promise<void>;
  onMarkAsPaid: () => Promise<void>;
}

export const ActionButtons = ({
  status,
  isLoading,
  emailSentAt,
  pdfUrl,
  onEdit,
  onSend,
  onGeneratePDF,
  onGenerateInvoice,
  onMarkAsPaid,
}: ActionButtonsProps) => {
  switch (status) {
    case "draft":
      return (
        <div className="flex justify-between w-full">
          <div>
            <Button variant="outline" onClick={onEdit}>
              <FileEdit className="h-4 w-4 mr-2" />
              Editar Rascunho
            </Button>
          </div>
          <div className="flex gap-2">
            <Button onClick={onGenerateInvoice} disabled={isLoading}>
              <FileText className="h-4 w-4 mr-2" />
              {isLoading ? "Gerando..." : "Gerar Fatura"}
            </Button>
          </div>
        </div>
      );
    
    case "created":
      return (
        <div className="flex justify-between w-full">
          <div>
            <Button variant="outline" onClick={onEdit}>
              <FileEdit className="h-4 w-4 mr-2" />
              Voltar para Rascunho
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={onSend} disabled={isLoading}>
              <Send className="h-4 w-4 mr-2" />
              {isLoading ? "Enviando..." : "Enviar"}
            </Button>
            <Button variant="outline" onClick={onGeneratePDF} disabled={isLoading}>
              <FileText className="h-4 w-4 mr-2" />
              {isLoading ? "Gerando..." : "Gerar PDF"}
            </Button>
          </div>
        </div>
      );
    
    case "pending":
      return (
        <div className="flex justify-between w-full">
          <div />
          <div className="flex gap-2">
            {!emailSentAt && (
              <Button variant="secondary" onClick={onSend} disabled={isLoading}>
                <Send className="h-4 w-4 mr-2" />
                {isLoading ? "Enviando..." : "Reenviar"}
              </Button>
            )}
            {pdfUrl ? (
              <Button variant="outline" onClick={() => window.open(pdfUrl, "_blank")}>
                <FileText className="h-4 w-4 mr-2" />
                Ver PDF
              </Button>
            ) : (
              <Button variant="outline" onClick={onGeneratePDF} disabled={isLoading}>
                <FileText className="h-4 w-4 mr-2" />
                {isLoading ? "Gerando..." : "Gerar PDF"}
              </Button>
            )}
            <Button variant="default" onClick={onMarkAsPaid} disabled={isLoading}>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              {isLoading ? "Processando..." : "Marcar como Paga"}
            </Button>
          </div>
        </div>
      );
    
    default:
      return null;
  }
};
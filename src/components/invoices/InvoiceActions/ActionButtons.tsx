import { Button } from "@/components/ui/button";
import { FileEdit, Send, FileText } from "lucide-react";
import { InvoiceStatus } from "../types";

interface ActionButtonsProps {
  status: InvoiceStatus;
  isLoading: boolean;
  emailSentAt?: string | null;
  pdfUrl?: string | null;
  onEdit: () => void;
  onSend: () => Promise<void>;
  onGeneratePDF: () => Promise<void>;
}

export const ActionButtons = ({
  status,
  isLoading,
  emailSentAt,
  pdfUrl,
  onEdit,
  onSend,
  onGeneratePDF,
}: ActionButtonsProps) => {
  switch (status) {
    case "draft":
      return (
        <Button variant="outline" onClick={onEdit}>
          <FileEdit className="h-4 w-4 mr-2" />
          Editar Rascunho
        </Button>
      );
    
    case "created":
      return (
        <div className="flex gap-2">
          <Button variant="outline" onClick={onEdit}>
            <FileEdit className="h-4 w-4 mr-2" />
            Voltar para Rascunho
          </Button>
          <Button onClick={onSend} disabled={isLoading}>
            <Send className="h-4 w-4 mr-2" />
            Enviar
          </Button>
          <Button variant="outline" onClick={onGeneratePDF} disabled={isLoading}>
            <FileText className="h-4 w-4 mr-2" />
            Gerar PDF
          </Button>
        </div>
      );
    
    case "pending":
      return (
        <div className="flex gap-2">
          {!emailSentAt && (
            <Button onClick={onSend} disabled={isLoading}>
              <Send className="h-4 w-4 mr-2" />
              Reenviar
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
              Gerar PDF
            </Button>
          )}
        </div>
      );
    
    default:
      return null;
  }
};
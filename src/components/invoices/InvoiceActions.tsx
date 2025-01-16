import { InvoiceStatus } from "./types";
import { ActionButtons } from "./InvoiceActions/ActionButtons";
import { CancelDialog } from "./InvoiceActions/CancelDialog";
import { useInvoiceActions } from "./InvoiceActions/useInvoiceActions";

interface InvoiceActionsProps {
  status: InvoiceStatus;
  invoiceId: string;
  onEdit: () => void;
  onStatusChange: (newStatus: InvoiceStatus) => Promise<void>;
  pdfUrl?: string | null;
  emailSentAt?: string | null;
}

export const InvoiceActions = ({
  status,
  invoiceId,
  onEdit,
  onStatusChange,
  pdfUrl,
  emailSentAt,
}: InvoiceActionsProps) => {
  const {
    isLoading,
    handleGeneratePDF,
    handleSend,
    handleCancel,
    handleGenerateInvoice,
  } = useInvoiceActions({ invoiceId, onStatusChange });

  return (
    <div className="flex gap-2 justify-between">
      <ActionButtons
        status={status}
        isLoading={isLoading}
        emailSentAt={emailSentAt}
        pdfUrl={pdfUrl}
        onEdit={onEdit}
        onSend={handleSend}
        onGeneratePDF={handleGeneratePDF}
        onGenerateInvoice={handleGenerateInvoice}
      />
      
      <CancelDialog 
        status={status}
        onCancel={handleCancel}
      />
    </div>
  );
};
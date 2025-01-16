import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText } from "lucide-react";
import { Invoice } from "../types";
import { StatusBadge } from "../StatusBadge";

interface InvoiceHeaderProps {
  invoice: Invoice;
  currentStatus: Invoice['status'];
}

export const InvoiceHeader = ({ invoice, currentStatus }: InvoiceHeaderProps) => {
  return (
    <DialogHeader>
      <div className="flex items-start justify-between mb-4">
        <DialogTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Fatura #{invoice.id.slice(0, 8)}
        </DialogTitle>
        <div className="flex-shrink-0 ml-4">
          <StatusBadge status={currentStatus} />
        </div>
      </div>
      <div className="mt-2">
        <h3 className="text-lg font-medium">Cliente</h3>
        <p className="text-muted-foreground">{invoice.customer?.name}</p>
      </div>
    </DialogHeader>
  );
};
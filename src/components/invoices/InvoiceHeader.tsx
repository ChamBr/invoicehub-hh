import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface InvoiceHeaderProps {
  onNewInvoice: () => void;
}

export function InvoiceHeader({ onNewInvoice }: InvoiceHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Faturas</h1>
      <Button onClick={onNewInvoice} className="flex items-center gap-2">
        <PlusCircle className="h-5 w-5" />
        Nova Fatura
      </Button>
    </div>
  );
}
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InvoiceNumberingFormProps {
  defaultPrefix?: string;
  defaultNextNumber?: number;
}

export const InvoiceNumberingForm = ({
  defaultPrefix,
  defaultNextNumber,
}: InvoiceNumberingFormProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="invoice_prefix">Prefixo da Fatura</Label>
        <Input
          id="invoice_prefix"
          name="invoice_prefix"
          defaultValue={defaultPrefix}
          placeholder="Ex: INV"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="invoice_next_number">Próximo Número</Label>
        <Input
          id="invoice_next_number"
          name="invoice_next_number"
          type="number"
          defaultValue={defaultNextNumber}
          min="1"
        />
      </div>
    </div>
  );
};
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InvoiceCurrencyFormProps {
  defaultCurrency?: string;
  defaultDueDays?: number;
}

export const InvoiceCurrencyForm = ({
  defaultCurrency,
  defaultDueDays,
}: InvoiceCurrencyFormProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="invoice_currency">Moeda</Label>
        <Input
          id="invoice_currency"
          name="invoice_currency"
          defaultValue={defaultCurrency || 'USD'}
          placeholder="USD"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="invoice_due_days">Prazo de Pagamento (dias)</Label>
        <Input
          id="invoice_due_days"
          name="invoice_due_days"
          type="number"
          defaultValue={defaultDueDays}
          min="0"
        />
      </div>
    </div>
  );
};
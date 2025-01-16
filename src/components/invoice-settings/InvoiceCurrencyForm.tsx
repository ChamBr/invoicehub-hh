import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from 'react-i18next';

interface InvoiceCurrencyFormProps {
  defaultCurrency?: string;
  defaultDueDays?: number;
}

export const InvoiceCurrencyForm = ({
  defaultCurrency,
  defaultDueDays,
}: InvoiceCurrencyFormProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="invoice_currency">{t('invoice_settings.currency.currency')}</Label>
        <Input
          id="invoice_currency"
          name="invoice_currency"
          defaultValue={defaultCurrency || 'USD'}
          placeholder="USD"
          className="focus:ring-2 focus:ring-primary focus:border-primary invalid:border-red-500 invalid:ring-red-500"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="invoice_due_days">{t('invoice_settings.currency.due_days')}</Label>
        <Input
          id="invoice_due_days"
          name="invoice_due_days"
          type="number"
          defaultValue={defaultDueDays}
          min="0"
          className="focus:ring-2 focus:ring-primary focus:border-primary invalid:border-red-500 invalid:ring-red-500"
        />
      </div>
    </div>
  );
};
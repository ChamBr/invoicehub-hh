import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useTranslation } from 'react-i18next';

interface InvoiceNumberingFormProps {
  defaultPrefix?: string;
  defaultNextNumber?: number;
}

export const InvoiceNumberingForm = ({
  defaultPrefix,
  defaultNextNumber,
}: InvoiceNumberingFormProps) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="invoice_prefix">{t('invoice_settings.numbering.prefix')}</Label>
        <Input
          id="invoice_prefix"
          name="invoice_prefix"
          defaultValue={defaultPrefix}
          placeholder={t('invoice_settings.numbering.prefix_placeholder')}
          className="focus:ring-2 focus:ring-primary focus:border-primary invalid:border-red-500 invalid:ring-red-500"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="invoice_next_number">{t('invoice_settings.numbering.next_number')}</Label>
        <Input
          id="invoice_next_number"
          name="invoice_next_number"
          type="number"
          defaultValue={defaultNextNumber}
          min="1"
          className="focus:ring-2 focus:ring-primary focus:border-primary invalid:border-red-500 invalid:ring-red-500"
        />
      </div>
    </div>
  );
};
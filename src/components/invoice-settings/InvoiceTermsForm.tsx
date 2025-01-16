import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from 'react-i18next';

interface InvoiceTermsFormProps {
  defaultTerms?: string;
  defaultFooter?: string;
}

export const InvoiceTermsForm = ({
  defaultTerms,
  defaultFooter,
}: InvoiceTermsFormProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="invoice_terms">{t('invoice_settings.terms.terms')}</Label>
        <Textarea
          id="invoice_terms"
          name="invoice_terms"
          defaultValue={defaultTerms}
          rows={4}
          className="focus:ring-2 focus:ring-primary focus:border-primary invalid:border-red-500 invalid:ring-red-500"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="invoice_footer">{t('invoice_settings.terms.footer')}</Label>
        <Textarea
          id="invoice_footer"
          name="invoice_footer"
          defaultValue={defaultFooter}
          rows={3}
          className="focus:ring-2 focus:ring-primary focus:border-primary invalid:border-red-500 invalid:ring-red-500"
        />
      </div>
    </div>
  );
};
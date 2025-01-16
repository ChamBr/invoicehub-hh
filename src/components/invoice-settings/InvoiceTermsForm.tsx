import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface InvoiceTermsFormProps {
  defaultTerms?: string;
  defaultFooter?: string;
}

export const InvoiceTermsForm = ({
  defaultTerms,
  defaultFooter,
}: InvoiceTermsFormProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="invoice_terms">Termos e Condições</Label>
        <Textarea
          id="invoice_terms"
          name="invoice_terms"
          defaultValue={defaultTerms}
          rows={4}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="invoice_footer">Rodapé da Fatura</Label>
        <Textarea
          id="invoice_footer"
          name="invoice_footer"
          defaultValue={defaultFooter}
          rows={3}
        />
      </div>
    </div>
  );
};
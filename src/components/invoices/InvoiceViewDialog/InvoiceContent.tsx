import { InvoiceDetailsItems } from "../InvoiceDetailsItems";
import { Invoice } from "../types";

interface InvoiceContentProps {
  invoice: Invoice;
}

export const InvoiceContent = ({ invoice }: InvoiceContentProps) => {
  return (
    <>
      <div>
        <h3 className="text-lg font-medium mb-2">Itens</h3>
        <InvoiceDetailsItems items={invoice.items || []} />
      </div>

      {invoice.notes && (
        <div>
          <h3 className="text-lg font-medium mb-2">Observações</h3>
          <p className="text-muted-foreground">{invoice.notes}</p>
        </div>
      )}
    </>
  );
};
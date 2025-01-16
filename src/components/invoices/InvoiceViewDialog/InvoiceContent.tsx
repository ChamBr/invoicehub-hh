import { InvoiceDetailsItems } from "../InvoiceDetailsItems";
import { Invoice } from "../types";

interface InvoiceContentProps {
  invoice: Invoice;
}

export const InvoiceContent = ({ invoice }: InvoiceContentProps) => {
  if (!invoice.items || invoice.items.length === 0) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        Nenhum item encontrado nesta fatura
      </div>
    );
  }

  return (
    <>
      <div>
        <h3 className="text-lg font-medium mb-2">Itens</h3>
        <InvoiceDetailsItems items={invoice.items} />
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
import { InvoiceDetailsItems } from "../InvoiceDetailsItems";
import { Invoice } from "../types";
import { InvoiceItems } from "../InvoiceItems";

interface InvoiceContentProps {
  invoice: Invoice;
  isEditing?: boolean;
}

export const InvoiceContent = ({ invoice, isEditing = false }: InvoiceContentProps) => {
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
        {isEditing ? (
          <InvoiceItems 
            items={invoice.items} 
            onItemsChange={() => {}} // Implementar a lógica de atualização
          />
        ) : (
          <InvoiceDetailsItems items={invoice.items} />
        )}
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
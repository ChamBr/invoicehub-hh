import { InvoiceDetailsItems } from "../InvoiceDetailsItems";
import { Invoice, InvoiceItem } from "../types";
import InvoiceItems from "../InvoiceItems";

interface InvoiceContentProps {
  invoice: Invoice;
  isEditing?: boolean;
  items?: InvoiceItem[];
  onItemsChange?: (items: InvoiceItem[]) => void;
}

export const InvoiceContent = ({ 
  invoice, 
  isEditing = false,
  items,
  onItemsChange
}: InvoiceContentProps) => {
  if (!invoice.items || invoice.items.length === 0) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        Nenhum item encontrado nesta fatura
      </div>
    );
  }

  const handleAdd = (item: InvoiceItem) => {
    if (onItemsChange && items) {
      onItemsChange([...items, item]);
    }
  };

  const handleRemove = (index: number) => {
    if (onItemsChange && items) {
      const newItems = [...items];
      newItems.splice(index, 1);
      onItemsChange(newItems);
    }
  };

  const handleUpdate = (index: number, updatedItem: InvoiceItem) => {
    if (onItemsChange && items) {
      const newItems = [...items];
      newItems[index] = updatedItem;
      onItemsChange(newItems);
    }
  };

  return (
    <>
      <div>
        <h3 className="text-lg font-medium mb-2">Itens</h3>
        {isEditing ? (
          <InvoiceItems 
            items={items || invoice.items} 
            onAdd={handleAdd}
            onRemove={handleRemove}
            onUpdate={handleUpdate}
            readOnly={false}
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
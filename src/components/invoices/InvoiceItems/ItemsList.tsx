import { InvoiceItem } from "../types";
import { InvoiceItemRow } from "../InvoiceItemRow";

interface ItemsListProps {
  items: InvoiceItem[];
  onUpdate: (index: number, item: InvoiceItem) => void;
  onRemove: (index: number) => void;
  readOnly?: boolean;
}

export const ItemsList = ({ items, onUpdate, onRemove, readOnly = false }: ItemsListProps) => {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <InvoiceItemRow
          key={index}
          item={item}
          index={index}
          onUpdate={onUpdate}
          onRemove={onRemove}
          readOnly={readOnly}
        />
      ))}
    </div>
  );
};
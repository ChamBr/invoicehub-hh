import { useState } from "react";
import { InvoiceItem } from "../types";

export const useInvoiceItems = () => {
  const [items, setItems] = useState<InvoiceItem[]>([]);

  const handleAddItem = (item: InvoiceItem) => {
    setItems([...items, item]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleUpdateItem = (index: number, updatedItem: InvoiceItem) => {
    setItems(items.map((item, i) => (i === index ? updatedItem : item)));
  };

  return {
    items,
    handleAddItem,
    handleRemoveItem,
    handleUpdateItem,
  };
};
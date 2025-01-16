import { InvoiceItem } from "./types";

export const calculateTotal = (items: InvoiceItem[]): number => {
  return items.reduce((sum, item) => {
    const itemTotal = item.total;
    const taxAmount = item.hasTax ? itemTotal * 0.10 : 0; // 10% de imposto
    return sum + itemTotal + taxAmount;
  }, 0);
};
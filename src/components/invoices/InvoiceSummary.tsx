import { InvoiceItem } from "./types";

interface InvoiceSummaryProps {
  items: InvoiceItem[];
}

const InvoiceSummary = ({ items }: InvoiceSummaryProps) => {
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const tax = items.reduce((sum, item) => {
    return sum + (item.hasTax ? item.total * 0.10 : 0);
  }, 0);
  const total = subtotal + tax;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Subtotal</span>
        <span>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(subtotal)}
        </span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Impostos (10%)</span>
        <span>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(tax)}
        </span>
      </div>
      <div className="flex justify-between font-medium pt-2 border-t">
        <span>Total</span>
        <span>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(total)}
        </span>
      </div>
    </div>
  );
};

export default InvoiceSummary;
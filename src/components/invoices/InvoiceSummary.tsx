import { Card, CardContent } from "@/components/ui/card";
import { useInvoiceStore } from "@/stores/useInvoiceStore";

const TAX_RATE = 0.10; // 10% de imposto

const InvoiceSummary = () => {
  const items = useInvoiceStore((state) => state.items);
  
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  
  const taxTotal = items.reduce((sum, item) => {
    if (item.hasTax) {
      return sum + (item.total * TAX_RATE);
    }
    return sum;
  }, 0);

  const total = subtotal + taxTotal;

  return (
    <Card>
      <CardContent className="p-6">
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
            <span>Impostos</span>
            <span>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(taxTotal)}
            </span>
          </div>
          <div className="border-t pt-2 flex justify-between font-medium">
            <span>Total</span>
            <span>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(total)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceSummary;
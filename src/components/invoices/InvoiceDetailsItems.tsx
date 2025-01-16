interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
  hasTax: boolean;
}

interface InvoiceDetailsItemsProps {
  items: InvoiceItem[];
}

const TAX_RATE = 0.10; // 10% de imposto

export const InvoiceDetailsItems = ({ items }: InvoiceDetailsItemsProps) => {
  return (
    <div className="space-y-2">
      {items.map((item) => {
        const taxAmount = item.hasTax ? item.total * TAX_RATE : 0;
        const totalWithTax = item.total + taxAmount;

        return (
          <div
            key={item.id}
            className="flex flex-col p-4 bg-muted rounded-lg space-y-2"
          >
            <div className="flex justify-between">
              <div>
                <p className="font-medium">{item.description}</p>
                <p className="text-sm text-muted-foreground">
                  Quantidade: {item.quantity}
                </p>
                <p className="text-sm text-muted-foreground">
                  Preço unitário: {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(item.price)}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(item.total)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Impostos: {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(taxAmount)}
                </p>
                <p className="font-medium text-primary">
                  Total com impostos: {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(totalWithTax)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
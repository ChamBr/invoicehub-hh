interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  total: number;
}

interface InvoiceDetailsItemsProps {
  items: InvoiceItem[];
}

export const InvoiceDetailsItems = ({ items }: InvoiceDetailsItemsProps) => {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex justify-between p-2 bg-muted rounded-lg"
        >
          <div>
            <p className="font-medium">{item.description}</p>
            <p className="text-sm text-muted-foreground">
              Quantidade: {item.quantity}
            </p>
          </div>
          <p className="font-medium">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(item.total)}
          </p>
        </div>
      ))}
    </div>
  );
};
interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
  total: number;
}

interface PreviewItemsProps {
  items: InvoiceItem[];
}

export const PreviewItems = ({ items }: PreviewItemsProps) => {
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const taxRate = 0.08; // 8% como no exemplo
  const tax = subtotal * taxRate;
  const shipping = 8000; // R$ 8.000,00 como no exemplo
  const total = subtotal + tax + shipping;

  return (
    <div className="space-y-6">
      <table className="w-full">
        <thead>
          <tr className="bg-invoice-tableHeader text-white">
            <th className="px-6 py-3 text-left">Descrição do Item</th>
            <th className="px-6 py-3 text-center">Quantidade</th>
            <th className="px-6 py-3 text-right">Preço</th>
            <th className="px-6 py-3 text-right">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {items.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4">{item.description}</td>
              <td className="px-6 py-4 text-center">{item.quantity}</td>
              <td className="px-6 py-4 text-right">
                {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </td>
              <td className="px-6 py-4 text-right">
                {item.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between">
        {/* Notas */}
        <div className="w-1/2">
          <h3 className="font-semibold mb-2">Notas:</h3>
          <div className="text-sm text-gray-600">
            Observações / Instruções de Pagamento
          </div>
        </div>

        {/* Totais */}
        <div className="w-1/3 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>{subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Taxa ({(taxRate * 100)}%):</span>
            <span>{tax.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Frete / Manuseio:</span>
            <span>{shipping.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </div>
          <div className="flex justify-between font-bold text-lg text-invoice-blue pt-2 border-t">
            <span>Total:</span>
            <span>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
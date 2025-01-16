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
  const total = items.reduce((sum, item) => sum + item.total, 0);
  const tax = total * 0.10;
  const grandTotal = total + tax;

  return (
    <div>
      <table className="w-full">
        <thead className="bg-gray-50 text-sm">
          <tr>
            <th className="px-4 py-2 text-left">Descrição</th>
            <th className="px-4 py-2 text-center">Qtd</th>
            <th className="px-4 py-2 text-right">Valor Unit.</th>
            <th className="px-4 py-2 text-right">Total</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {items.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-3">{item.description}</td>
              <td className="px-4 py-3 text-center">{item.quantity}</td>
              <td className="px-4 py-3 text-right">
                {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </td>
              <td className="px-4 py-3 text-right">
                {item.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="text-sm font-medium">
          <tr>
            <td colSpan={3} className="px-4 py-2 text-right">Subtotal:</td>
            <td className="px-4 py-2 text-right">
              {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </td>
          </tr>
          <tr>
            <td colSpan={3} className="px-4 py-2 text-right">Impostos (10%):</td>
            <td className="px-4 py-2 text-right">
              {tax.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </td>
          </tr>
          <tr className="font-bold">
            <td colSpan={3} className="px-4 py-2 text-right">Total:</td>
            <td className="px-4 py-2 text-right">
              {grandTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
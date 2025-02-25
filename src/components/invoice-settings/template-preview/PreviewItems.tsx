interface PreviewItemsProps {
  items: Array<{
    description: string;
    quantity: number;
    price: number;
    total: number;
  }>;
  tableStyle?: 'simple' | 'minimal' | 'modern' | 'bordered';
}

export const PreviewItems = ({ items, tableStyle = 'modern' }: PreviewItemsProps) => {
  return (
    <div className="mt-8 space-y-6">      
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-[#F8FAFC]">
            <th className="px-4 py-3 text-left text-xs font-medium text-[#0EA5E9] uppercase">
              Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-[#0EA5E9] uppercase">
              Description
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-[#0EA5E9] uppercase">
              Quantity
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-[#0EA5E9] uppercase">
              Rate
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-[#0EA5E9] uppercase">
              Amount
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {items.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}>
              <td className="px-4 py-3 text-sm text-gray-900">
                {new Date().toLocaleDateString('pt-BR')}
              </td>
              <td className="px-4 py-3 text-sm text-gray-900">{item.description}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{item.quantity}</td>
              <td className="px-4 py-3 text-sm text-gray-900">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(item.price)}
              </td>
              <td className="px-4 py-3 text-sm text-gray-900">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(item.total)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-8 flex justify-between items-start gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm w-2/3">
          <h3 className="font-medium text-[#1F2937] mb-4">Remarks / Instructions</h3>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Make all checks payable to [Company Name]</p>
            <p className="text-sm text-gray-600">
              If you have any questions concerning this invoice, contact:<br />
              <span className="font-medium">Name:</span> [Contact Name]<br />
              <span className="font-medium">Phone:</span> [Phone Number]<br />
              <span className="font-medium">Email:</span> [Email Address]
            </p>
          </div>
        </div>
        
        <div className="space-y-2 text-right w-1/3">
          <div className="flex justify-between gap-8">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium">$3,250.00</span>
          </div>
          <div className="flex justify-between gap-8">
            <span className="text-gray-600">Tax rate:</span>
            <span className="font-medium">3.80%</span>
          </div>
          <div className="flex justify-between gap-8">
            <span className="text-gray-600">Total tax:</span>
            <span className="font-medium">$123.50</span>
          </div>
          <div className="flex justify-between gap-8 pt-2 border-t">
            <span className="text-gray-800 font-medium">Invoice Total:</span>
            <span className="text-[#0EA5E9] text-xl font-bold">$3,373.50</span>
          </div>
        </div>
      </div>
    </div>
  );
};
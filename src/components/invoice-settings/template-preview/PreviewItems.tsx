interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
  total: number;
}

interface PreviewItemsProps {
  items: InvoiceItem[];
  tableStyle?: 'simple' | 'minimal' | 'modern' | 'bordered';
}

export const PreviewItems = ({ items, tableStyle = 'modern' }: PreviewItemsProps) => {
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const taxRate = 0.038;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const getTableStyles = () => {
    switch (tableStyle) {
      case 'simple':
        return {
          header: 'bg-emerald-100 text-emerald-800',
          row: 'hover:bg-gray-50',
          alternateRow: '',
        };
      case 'minimal':
        return {
          header: 'border-b-2 border-emerald-500 text-emerald-700',
          row: 'border-b border-gray-100',
          alternateRow: '',
        };
      case 'bordered':
        return {
          header: 'bg-emerald-600 text-white border border-emerald-700',
          row: 'border border-gray-200',
          alternateRow: 'bg-gray-50',
        };
      case 'modern':
      default:
        return {
          header: 'bg-[#33C3F0] text-white',
          row: '',
          alternateRow: 'bg-[#F1F1F1]',
        };
    }
  };

  const styles = getTableStyles();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg">
        <h3 className="text-lg font-semibold text-emerald-600 mb-4">Project details:</h3>
        <p className="text-gray-600 mb-4">Provide a brief overview of or any pertinent information regarding the project, if applicable</p>
        
        <table className="w-full">
          <thead>
            <tr className={styles.header}>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Description of work</th>
              <th className="px-6 py-3 text-center">Hours</th>
              <th className="px-6 py-3 text-right">Rate</th>
              <th className="px-6 py-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? styles.row : `${styles.row} ${styles.alternateRow}`}>
                <td className="px-6 py-4">{new Date().toLocaleDateString('en-US')}</td>
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
      </div>

      <div className="flex justify-between items-start">
        <div className="w-1/2">
          <h3 className="text-lg font-semibold text-emerald-600 mb-3">Remarks / Instructions</h3>
          <div className="space-y-2 text-gray-600">
            <p>Make all checks payable to [Company Name]</p>
            <p>If you have any questions concerning this invoice,</p>
            <p>Contact Name, Phone Number, Email</p>
            <p className="mt-4">www.site.com</p>
          </div>
        </div>

        <div className="w-1/3">
          <div className="space-y-2">
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">{subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Tax rate:</span>
              <span className="font-medium">3.80%</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Total tax:</span>
              <span className="font-medium">{tax.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-t border-emerald-500">
              <span className="text-xl font-semibold text-emerald-600">Invoice Total:</span>
              <span className="text-xl font-bold text-emerald-600">{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
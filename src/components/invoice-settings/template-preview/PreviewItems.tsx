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
  const getTableStyles = () => {
    switch (tableStyle) {
      case 'minimal':
        return 'min-w-full divide-y divide-gray-200';
      case 'bordered':
        return 'min-w-full border border-gray-200';
      case 'simple':
        return 'min-w-full divide-y divide-gray-200 bg-white';
      case 'modern':
      default:
        return 'min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden';
    }
  };

  const getHeaderStyles = () => {
    switch (tableStyle) {
      case 'minimal':
        return 'px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider';
      case 'bordered':
        return 'px-4 py-3 text-left text-xs font-medium text-white bg-gray-800 border-b';
      case 'simple':
        return 'px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50';
      case 'modern':
      default:
        return 'px-4 py-3 text-left text-xs font-medium text-white bg-[#1EAEDB] uppercase tracking-wider';
    }
  };

  const getCellStyles = () => {
    switch (tableStyle) {
      case 'minimal':
        return 'px-4 py-3 text-sm text-gray-900';
      case 'bordered':
        return 'px-4 py-3 text-sm text-gray-900 border-b';
      case 'simple':
        return 'px-4 py-3 text-sm text-gray-900 bg-white';
      case 'modern':
      default:
        return 'px-4 py-3 text-sm text-gray-900 bg-white';
    }
  };

  return (
    <div className="mt-8">
      <table className={getTableStyles()}>
        <thead>
          <tr>
            <th className={getHeaderStyles()}>Descrição</th>
            <th className={getHeaderStyles()}>Qtd</th>
            <th className={getHeaderStyles()}>Preço</th>
            <th className={getHeaderStyles()}>Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {items.map((item, index) => (
            <tr key={index}>
              <td className={getCellStyles()}>{item.description}</td>
              <td className={getCellStyles()}>{item.quantity}</td>
              <td className={getCellStyles()}>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(item.price)}
              </td>
              <td className={getCellStyles()}>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(item.total)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
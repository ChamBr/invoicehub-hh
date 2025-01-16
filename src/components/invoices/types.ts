export type InvoiceStatus = 'draft' | 'created' | 'sent' | 'pending' | 'overdue' | 'cancelled' | 'paid';

export interface InvoiceItem {
  productId: string | null;
  description: string;
  quantity: number;
  price: number;
  hasTax: boolean;
  total: number;
}

export interface Invoice {
  id: string;
  created_at: string;
  customer_id: string;
  status: InvoiceStatus;
  due_date: string;
  total: number;
  notes?: string;
  customer?: {
    name: string;
  };
}

export const getStatusColor = (status: InvoiceStatus) => {
  const colors = {
    draft: 'bg-gray-100 text-gray-800 border-gray-500',
    created: 'bg-blue-100 text-blue-800 border-blue-500',
    sent: 'bg-indigo-100 text-indigo-800 border-indigo-500',
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-500',
    overdue: 'bg-red-100 text-red-800 border-red-500',
    cancelled: 'bg-rose-100 text-rose-800 border-rose-500',
    paid: 'bg-green-100 text-green-800 border-green-500',
  };
  return colors[status];
};

export const getStatusLabel = (status: InvoiceStatus): string => {
  const labels = {
    draft: 'Rascunho',
    created: 'Criada',
    sent: 'Enviada',
    pending: 'Pendente',
    overdue: 'Vencida',
    cancelled: 'Cancelada',
    paid: 'Paga',
  };
  return labels[status];
};
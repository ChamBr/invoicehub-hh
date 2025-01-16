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

export const invoiceStatusConfig = {
  draft: {
    label: 'Rascunho',
    color: 'bg-gray-100 text-gray-800 border-gray-500',
    icon: 'FileText'
  },
  created: {
    label: 'Criada',
    color: 'bg-blue-100 text-blue-800 border-blue-500',
    icon: 'CheckCircle2'
  },
  sent: {
    label: 'Enviada',
    color: 'bg-indigo-100 text-indigo-800 border-indigo-500',
    icon: 'Send'
  },
  pending: {
    label: 'Pendente',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-500',
    icon: 'Clock'
  },
  overdue: {
    label: 'Vencida',
    color: 'bg-red-100 text-red-800 border-red-500',
    icon: 'AlertCircle'
  },
  cancelled: {
    label: 'Cancelada',
    color: 'bg-rose-100 text-rose-800 border-rose-500',
    icon: 'XCircle'
  },
  paid: {
    label: 'Paga',
    color: 'bg-green-100 text-green-800 border-green-500',
    icon: 'CheckCircle2'
  }
} as const;
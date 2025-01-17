export type InvoiceStatus = 'draft' | 'created' | 'sent' | 'pending' | 'overdue' | 'cancelled' | 'paid';

export interface InvoiceItem {
  id: string;
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
  pdf_generated_at?: string | null;
  email_sent_at?: string | null;
  pdf_url?: string | null;
  template_id?: string | null;
  subscriber_id?: string;
  items: InvoiceItem[];
  customer?: {
    name: string;
  };
}

export const invoiceStatusConfig = {
  draft: {
    label: 'Rascunho',
    color: 'text-gray-500 border-gray-200 bg-gray-50',
  },
  created: {
    label: 'Criada',
    color: 'text-blue-500 border-blue-200 bg-blue-50',
  },
  sent: {
    label: 'Enviada',
    color: 'text-purple-500 border-purple-200 bg-purple-50',
  },
  pending: {
    label: 'Pendente',
    color: 'text-yellow-500 border-yellow-200 bg-yellow-50',
  },
  overdue: {
    label: 'Atrasada',
    color: 'text-red-500 border-red-200 bg-red-50',
  },
  cancelled: {
    label: 'Cancelada',
    color: 'text-gray-500 border-gray-200 bg-gray-50',
  },
  paid: {
    label: 'Paga',
    color: 'text-emerald-500 border-emerald-200 bg-emerald-50',
  },
} as const;
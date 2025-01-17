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
  id?: string;
  created_at?: string;
  customer_id: string;
  status?: InvoiceStatus;
  due_date: string;
  total: number;
  notes?: string;
  pdf_generated_at?: string;
  email_sent_at?: string;
  pdf_url?: string;
  template_id?: string;
  subscriber_id?: string;
  items: InvoiceItem[];
}

export interface InvoiceStore {
  items: InvoiceItem[];
  addItem: (item: InvoiceItem) => void;
  removeItem: (index: number) => void;
  updateItem: (index: number, item: InvoiceItem) => void;
  clearItems: () => void;
  calculateTotal: () => number;
}
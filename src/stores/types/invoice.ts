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
  customerId: string;
  status: InvoiceStatus;
  dueDate: string;
  total: number;
  notes?: string;
  templateId?: string;
  subscriberId?: string;
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
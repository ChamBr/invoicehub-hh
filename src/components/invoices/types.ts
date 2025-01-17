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
}
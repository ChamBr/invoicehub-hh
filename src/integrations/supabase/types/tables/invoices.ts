export interface Invoice {
  id: string;
  customer_id: string;
  created_at: string;
  due_date: string;
  notes: string | null;
  pdf_generated_at: string | null;
  pdf_url: string | null;
  status: 'draft' | 'created' | 'sent' | 'pending' | 'overdue' | 'cancelled' | 'paid' | null;
  template_id: string | null;
  total: number;
}
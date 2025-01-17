export interface Feedback {
  id: string;
  customer_id: string | null;
  title: string;
  description: string;
  priority: string | null;
  status: string | null;
  created_at: string;
  resolved_at: string | null;
}
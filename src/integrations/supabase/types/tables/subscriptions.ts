export interface Subscription {
  id: string;
  customer_id: string;
  plan_id: string;
  billing_period: string;
  start_date: string;
  end_date: string | null;
  renewal_date: string | null;
  status: string | null;
  created_at: string;
  updated_at: string;
}
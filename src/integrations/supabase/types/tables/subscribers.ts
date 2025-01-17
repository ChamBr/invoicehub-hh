export interface Subscriber {
  id: string;
  company_name: string | null;
  owner_id: string | null;
  plan_id: string | null;
  status: string | null;
  created_at: string;
  updated_at: string;
}
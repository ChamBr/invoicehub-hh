export interface SubscriberWithDetails {
  id: string;
  company_name: string | null;
  status: string | null;
  created_at: string;
  owner_id: string | null;
  users_count: number;
  owner: {
    full_name: string | null;
    id: string;
  } | null;
}
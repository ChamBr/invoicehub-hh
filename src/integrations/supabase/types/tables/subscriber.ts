export interface Subscriber {
  id: string;
  created_at: string;
  updated_at: string;
  company_name: string | null;
  status: string | null;
  owner_id: string | null;
  plan_id: string | null;
}

export interface SubscriberUser {
  id: string;
  created_at: string;
  updated_at: string;
  subscriber_id: string | null;
  user_id: string | null;
  role: 'superadmin' | 'admin' | 'user' | 'dependent' | null;
  status: string | null;
}
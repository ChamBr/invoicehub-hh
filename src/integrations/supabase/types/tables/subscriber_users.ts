export interface SubscriberUser {
  id: string;
  subscriber_id: string | null;
  user_id: string | null;
  role: 'superadmin' | 'admin' | 'user' | 'dependent' | null;
  status: string | null;
  created_at: string;
  updated_at: string;
}
import { Json } from '../common';

export interface Profile {
  id: string;
  created_at: string;
  updated_at: string;
  full_name: string | null;
  avatar_url: string | null;
  company: string | null;
  role: string | null;
  preferences: Json | null;
  phone: string | null;
  birth_date: string | null;
  gender: string | null;
  country: string | null;
}

export interface UserDashboardMetrics {
  id: string;
  user_id: string;
  metrics: string[];
  created_at: string;
  updated_at: string;
}
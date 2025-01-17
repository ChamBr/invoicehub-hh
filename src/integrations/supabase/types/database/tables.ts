import { Json } from '../common';

export interface Tables {
  company_profiles: {
    Row: CompanyProfile;
    Insert: CompanyProfileInsert;
    Update: CompanyProfileUpdate;
  };
  configurations: {
    Row: Configuration;
    Insert: ConfigurationInsert;
    Update: ConfigurationUpdate;
  };
  customers: {
    Row: Customer;
    Insert: CustomerInsert;
    Update: CustomerUpdate;
  };
  subscribers: {
    Row: Subscriber;
    Insert: SubscriberInsert;
    Update: SubscriberUpdate;
  };
  profiles: {
    Row: Profile;
    Insert: ProfileInsert;
    Update: ProfileUpdate;
  };
  // ... outras tabelas serão adicionadas conforme necessário
}

export interface CompanyProfile {
  id: string;
  user_id: string;
  company_name: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  country: string;
  phone: string | null;
  mobile: string | null;
  display_phone: boolean;
  tax_id: string | null;
  display_tax_id: boolean;
  email: string | null;
  website: string | null;
  logo_url: string | null;
  display_logo: boolean;
  created_at: string;
  updated_at: string;
  invoice_prefix: string;
  invoice_next_number: number;
  invoice_footer: string | null;
  invoice_terms: string | null;
  invoice_due_days: number;
  invoice_currency: string;
  invoice_template: string;
  active_template_id: string | null;
}

export interface Configuration {
  id: string;
  name: string;
  description: string | null;
  type: 'feature' | 'test' | 'appearance';
  is_enabled: boolean;
  created_at: string;
  updated_at: string;
  debug_activated_at: string | null;
  gradient_colors: Json;
  system_version: string;
}

export interface Customer {
  id: string;
  created_at: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  notes: string | null;
  status: string;
  type: string;
  tax_exempt: boolean;
  tax_id: string | null;
  contact_name: string | null;
}

export interface Subscriber {
  id: string;
  created_at: string;
  updated_at: string;
  company_name: string | null;
  status: string;
  owner_id: string | null;
  plan_id: string | null;
  owner?: {
    full_name: string | null;
    email: string | null;
  };
  users_count?: number;
}

export interface Profile {
  id: string;
  created_at: string;
  updated_at: string;
  full_name: string | null;
  avatar_url: string | null;
  company: string | null;
  role: string;
  preferences: Json | null;
  phone: string | null;
  birth_date: string | null;
  gender: string | null;
  country: string;
  email: string | null;
}

// Types para inserção
export type CompanyProfileInsert = Omit<CompanyProfile, 'id' | 'created_at' | 'updated_at'>;
export type ConfigurationInsert = Omit<Configuration, 'id' | 'created_at' | 'updated_at'>;
export type CustomerInsert = Omit<Customer, 'id' | 'created_at'>;
export type SubscriberInsert = Omit<Subscriber, 'id' | 'created_at' | 'updated_at' | 'owner' | 'users_count'>;
export type ProfileInsert = Omit<Profile, 'created_at' | 'updated_at'>;

// Types para atualização
export type CompanyProfileUpdate = Partial<CompanyProfileInsert>;
export type ConfigurationUpdate = Partial<ConfigurationInsert>;
export type CustomerUpdate = Partial<CustomerInsert>;
export type SubscriberUpdate = Partial<SubscriberInsert>;
export type ProfileUpdate = Partial<ProfileInsert>;
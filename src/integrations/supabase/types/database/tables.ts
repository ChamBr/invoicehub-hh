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
  invoice_templates: {
    Row: InvoiceTemplate;
    Insert: InvoiceTemplateInsert;
    Update: InvoiceTemplateUpdate;
  };
  invoices: {
    Row: Invoice;
    Insert: InvoiceInsert;
    Update: InvoiceUpdate;
  };
  invoice_items: {
    Row: InvoiceItem;
    Insert: InvoiceItemInsert;
    Update: InvoiceItemUpdate;
  };
  products: {
    Row: Product;
    Insert: ProductInsert;
    Update: ProductUpdate;
  };
  feedback: {
    Row: Feedback;
    Insert: FeedbackInsert;
    Update: FeedbackUpdate;
  };
  email_settings: {
    Row: EmailSettings;
    Insert: EmailSettingsInsert;
    Update: EmailSettingsUpdate;
  };
  footer_settings: {
    Row: FooterSettings;
    Insert: FooterSettingsInsert;
    Update: FooterSettingsUpdate;
  };
  payment_integrations: {
    Row: PaymentIntegration;
    Insert: PaymentIntegrationInsert;
    Update: PaymentIntegrationUpdate;
  };
  plans: {
    Row: Plan;
    Insert: PlanInsert;
    Update: PlanUpdate;
  };
  subscriptions: {
    Row: Subscription;
    Insert: SubscriptionInsert;
    Update: SubscriptionUpdate;
  };
  system_settings: {
    Row: SystemSettings;
    Insert: SystemSettingsInsert;
    Update: SystemSettingsUpdate;
  };
  user_dashboard_metrics: {
    Row: UserDashboardMetrics;
    Insert: UserDashboardMetricsInsert;
    Update: UserDashboardMetricsUpdate;
  };
}

// Interfaces existentes
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

// Novas interfaces
export interface InvoiceTemplate {
  id: string;
  name: string;
  description: string | null;
  type: 'default' | 'simple' | 'detailed' | 'professional' | 'custom';
  content: Json;
  is_default: boolean;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  header_background_color: string;
  header_text_color: string;
  table_style: string;
  show_hours: boolean;
  show_rate: boolean;
}

export interface Invoice {
  id: string;
  created_at: string;
  customer_id: string;
  status: 'draft' | 'created' | 'sent' | 'pending' | 'overdue' | 'cancelled' | 'paid';
  due_date: string;
  total: number;
  notes: string | null;
  pdf_generated_at: string | null;
  email_sent_at: string | null;
  pdf_url: string | null;
  template_id: string | null;
}

export interface InvoiceItem {
  id: string;
  invoice_id: string;
  product_id: string | null;
  description: string;
  quantity: number;
  price: number;
  total: number;
  has_tax: boolean;
}

export interface Product {
  id: string;
  created_at: string;
  name: string;
  description: string | null;
  type: string;
  price: number;
  status: string;
  sku: string | null;
  stock: number;
}

export interface Feedback {
  id: string;
  created_at: string;
  customer_id: string | null;
  type: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  resolved_at: string | null;
}

export interface EmailSettings {
  id: string;
  sender_name: string;
  sender_email: string;
  created_at: string;
  updated_at: string;
}

export interface FooterSettings {
  id: string;
  left_text: string | null;
  center_text: string | null;
  right_text: string | null;
  created_at: string;
  updated_at: string;
  font_size: string;
  text_color: string;
  text_alpha: number;
  container_height: string;
  show_refresh_button: boolean;
  refresh_button_size: string;
  refresh_button_color: string;
}

export interface PaymentIntegration {
  id: string;
  name: string;
  provider: string;
  is_enabled: boolean;
  config: Json;
  created_at: string;
  updated_at: string;
}

export interface Plan {
  id: string;
  created_at: string;
  name: string;
  description: string | null;
  price: number;
  billing_period: string;
  features: Json;
  status: string;
  price_monthly: number;
  price_semiannual: number;
  price_annual: number;
  discount_semiannual: number;
  discount_annual: number;
}

export interface Subscription {
  id: string;
  created_at: string;
  customer_id: string;
  plan_id: string;
  status: string;
  start_date: string;
  end_date: string | null;
  renewal_date: string | null;
  billing_period: string;
  user_id: string | null;
}

export interface SystemSettings {
  id: string;
  feature_key: string;
  is_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserDashboardMetrics {
  id: string;
  user_id: string;
  metrics: string[];
  created_at: string;
  updated_at: string;
}

// Types para inserção
export type CompanyProfileInsert = Omit<CompanyProfile, 'id' | 'created_at' | 'updated_at'>;
export type ConfigurationInsert = Omit<Configuration, 'id' | 'created_at' | 'updated_at'>;
export type CustomerInsert = Omit<Customer, 'id' | 'created_at'>;
export type SubscriberInsert = Omit<Subscriber, 'id' | 'created_at' | 'updated_at' | 'owner' | 'users_count'>;
export type ProfileInsert = Omit<Profile, 'created_at' | 'updated_at'>;
export type InvoiceTemplateInsert = Omit<InvoiceTemplate, 'id' | 'created_at' | 'updated_at'>;
export type InvoiceInsert = Omit<Invoice, 'id' | 'created_at'>;
export type InvoiceItemInsert = Omit<InvoiceItem, 'id'>;
export type ProductInsert = Omit<Product, 'id' | 'created_at'>;
export type FeedbackInsert = Omit<Feedback, 'id' | 'created_at'>;
export type EmailSettingsInsert = Omit<EmailSettings, 'id' | 'created_at' | 'updated_at'>;
export type FooterSettingsInsert = Omit<FooterSettings, 'id' | 'created_at' | 'updated_at'>;
export type PaymentIntegrationInsert = Omit<PaymentIntegration, 'id' | 'created_at' | 'updated_at'>;
export type PlanInsert = Omit<Plan, 'id' | 'created_at'>;
export type SubscriptionInsert = Omit<Subscription, 'id' | 'created_at'>;
export type SystemSettingsInsert = Omit<SystemSettings, 'id' | 'created_at' | 'updated_at'>;
export type UserDashboardMetricsInsert = Omit<UserDashboardMetrics, 'id' | 'created_at' | 'updated_at'>;

// Types para atualização
export type CompanyProfileUpdate = Partial<CompanyProfileInsert>;
export type ConfigurationUpdate = Partial<ConfigurationInsert>;
export type CustomerUpdate = Partial<CustomerInsert>;
export type SubscriberUpdate = Partial<SubscriberInsert>;
export type ProfileUpdate = Partial<ProfileInsert>;
export type InvoiceTemplateUpdate = Partial<InvoiceTemplateInsert>;
export type InvoiceUpdate = Partial<InvoiceInsert>;
export type InvoiceItemUpdate = Partial<InvoiceItemInsert>;
export type ProductUpdate = Partial<ProductInsert>;
export type FeedbackUpdate = Partial<FeedbackInsert>;
export type EmailSettingsUpdate = Partial<EmailSettingsInsert>;
export type FooterSettingsUpdate = Partial<FooterSettingsInsert>;
export type PaymentIntegrationUpdate = Partial<PaymentIntegrationInsert>;
export type PlanUpdate = Partial<PlanInsert>;
export type SubscriptionUpdate = Partial<SubscriptionInsert>;
export type SystemSettingsUpdate = Partial<SystemSettingsInsert>;
export type UserDashboardMetricsUpdate = Partial<UserDashboardMetricsInsert>;

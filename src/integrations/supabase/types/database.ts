export interface Database {
  public: {
    Tables: {
      company_profiles: CompanyProfilesTable;
      configurations: ConfigurationsTable;
      countries: CountriesTable;
      customers: CustomersTable;
      email_settings: EmailSettingsTable;
      exchange_rates: ExchangeRatesTable;
      feedback: FeedbackTable;
      footer_settings: FooterSettingsTable;
      invoice_items: InvoiceItemsTable;
      invoice_templates: InvoiceTemplatesTable;
      invoices: InvoicesTable;
      payment_integrations: PaymentIntegrationsTable;
      plans: PlansTable;
      products: ProductsTable;
      profiles: ProfilesTable;
      subscriber_users: SubscriberUsersTable;
      subscribers: SubscribersTable;
      subscriptions: SubscriptionsTable;
      system_settings: SystemSettingsTable;
      user_dashboard_metrics: UserDashboardMetricsTable;
    };
    Views: Record<string, never>;
    Functions: {
      clean_test_data: {
        Args: Record<string, never>;
        Returns: undefined;
      };
      is_debug_mode_valid: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
    Enums: {
      config_type: 'feature' | 'test' | 'appearance';
      invoice_status: 'draft' | 'created' | 'sent' | 'pending' | 'overdue' | 'cancelled' | 'paid';
      invoice_template_type: 'default' | 'simple' | 'detailed' | 'professional' | 'custom';
      user_role: 'superadmin' | 'admin' | 'user' | 'dependent';
    };
  };
}

interface BaseTable<T> {
  Row: T;
  Insert: Partial<T>;
  Update: Partial<T>;
}

// Interfaces para cada tabela
interface CompanyProfilesTable extends BaseTable<{
  id: string;
  user_id: string;
  company_name?: string;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  country: string | null;
  phone: string | null;
  mobile: string | null;
  display_phone: boolean | null;
  tax_id: string | null;
  display_tax_id: boolean | null;
  email: string | null;
  website: string | null;
  logo_url: string | null;
  display_logo: boolean | null;
  created_at: string;
  updated_at: string;
  invoice_prefix: string | null;
  invoice_next_number: number | null;
  invoice_footer: string | null;
  invoice_terms: string | null;
  invoice_due_days: number | null;
  invoice_currency: string | null;
  invoice_template: string | null;
  active_template_id: string | null;
}> {}

interface ConfigurationsTable extends BaseTable<{
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  description: string | null;
  is_enabled: boolean | null;
  type: 'feature' | 'test' | 'appearance';
  debug_activated_at: string | null;
  gradient_colors: Json | null;
  system_version: string | null;
}> {}

interface CountriesTable extends BaseTable<{
  id: string;
  code: string;
  name_en: string;
  created_at: string;
  updated_at: string;
  is_active: boolean | null;
}> {}

interface CustomersTable extends BaseTable<{
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  notes: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  country: string | null;
  contact_name: string | null;
  tax_id: string | null;
  tax_exempt: boolean | null;
  status: string | null;
  created_at: string;
  updated_at: string;
}> {}

interface EmailSettingsTable extends BaseTable<{
  id: string;
  sender_email: string;
  sender_name: string;
  created_at: string;
  updated_at: string;
}> {}

interface ExchangeRatesTable extends BaseTable<{
  id: string;
  currency_code: string;
  rate: number;
  created_at: string;
  updated_at: string;
}> {}

interface FeedbackTable extends BaseTable<{
  id: string;
  customer_id: string | null;
  title: string;
  description: string;
  priority: string | null;
  status: string | null;
  created_at: string;
  resolved_at: string | null;
}> {}

interface FooterSettingsTable extends BaseTable<{
  id: string;
  center_text: string | null;
  left_text: string | null;
  right_text: string | null;
  font_size: string | null;
  container_height: string | null;
  refresh_button_color: string | null;
  refresh_button_size: string | null;
  show_refresh_button: boolean | null;
  text_alpha: number | null;
  text_color: string | null;
  created_at: string;
  updated_at: string;
}> {}

interface InvoiceItemsTable extends BaseTable<{
  id: string;
  invoice_id: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
  has_tax: boolean | null;
  product_id: string | null;
}> {}

interface InvoiceTemplatesTable extends BaseTable<{
  id: string;
  content: Json;
  created_at: string;
  created_by: string | null;
  description: string | null;
  header_background_color: string | null;
  header_text_color: string | null;
  is_default: boolean | null;
  name: string;
  show_hours: boolean | null;
  show_rate: boolean | null;
  table_style: string | null;
  type: 'default' | 'simple' | 'detailed' | 'professional' | 'custom';
  updated_at: string;
}> {}

interface InvoicesTable extends BaseTable<{
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
}> {}

interface PaymentIntegrationsTable extends BaseTable<{
  id: string;
  name: string;
  provider: string;
  config: Json | null;
  is_enabled: boolean | null;
  created_at: string;
  updated_at: string;
}> {}

interface PlansTable extends BaseTable<{
  id: string;
  name: string;
  description: string | null;
  price: number;
  billing_period: string;
  created_at: string;
  updated_at: string;
  discount_annual: number | null;
  discount_semiannual: number | null;
  price_annual: number | null;
  price_monthly: number | null;
  price_semiannual: number | null;
  status: string | null;
  features: Json | null;
}> {}

interface ProductsTable extends BaseTable<{
  id: string;
  name: string;
  description: string | null;
  price: number;
  sku: string | null;
  stock: number | null;
  status: string | null;
  type: string;
  created_at: string;
  updated_at: string;
}> {}

interface ProfilesTable extends BaseTable<{
  id: string;
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  company: string | null;
  role: string | null;
  preferences: Json | null;
  phone: string | null;
  birth_date: string | null;
  gender: string | null;
  country: string | null;
  created_at: string;
  updated_at: string;
}> {}

interface SubscriberUsersTable extends BaseTable<{
  id: string;
  subscriber_id: string | null;
  user_id: string | null;
  role: 'superadmin' | 'admin' | 'user' | 'dependent' | null;
  status: string | null;
  created_at: string;
  updated_at: string;
}> {}

interface SubscribersTable extends BaseTable<{
  id: string;
  company_name: string | null;
  owner_id: string | null;
  plan_id: string | null;
  status: string | null;
  created_at: string;
  updated_at: string;
}> {}

interface SubscriptionsTable extends BaseTable<{
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
}> {}

interface SystemSettingsTable extends BaseTable<{
  id: string;
  feature_key: string;
  is_enabled: boolean | null;
  created_at: string;
  updated_at: string;
}> {}

interface UserDashboardMetricsTable extends BaseTable<{
  id: string;
  user_id: string;
  metrics: string[];
  created_at: string;
  updated_at: string;
}> {}

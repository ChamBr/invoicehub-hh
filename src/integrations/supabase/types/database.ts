import { Configuration } from './tables/configurations';
import { Country } from './tables/countries';
import { EmailSettings } from './tables/email_settings';
import { ExchangeRate } from './tables/exchange_rates';
import { Feedback } from './tables/feedback';
import { FooterSettings } from './tables/footer_settings';
import { InvoiceItem } from './tables/invoice_items';
import { InvoiceTemplate } from './tables/invoice_templates';
import { Invoice } from './tables/invoices';
import { PaymentIntegration } from './tables/payment_integrations';
import { Plan } from './tables/plans';
import { Profile } from './tables/profiles';
import { SubscriberUser } from './tables/subscriber_users';
import { Subscriber } from './tables/subscribers';
import { Subscription } from './tables/subscriptions';
import { SystemSettings } from './tables/system_settings';
import { UserDashboardMetrics } from './tables/user_dashboard_metrics';

export interface Database {
  public: {
    Tables: {
      configurations: BaseTable<Configuration>;
      countries: BaseTable<Country>;
      email_settings: BaseTable<EmailSettings>;
      exchange_rates: BaseTable<ExchangeRate>;
      feedback: BaseTable<Feedback>;
      footer_settings: BaseTable<FooterSettings>;
      invoice_items: BaseTable<InvoiceItem>;
      invoice_templates: BaseTable<InvoiceTemplate>;
      invoices: BaseTable<Invoice>;
      payment_integrations: BaseTable<PaymentIntegration>;
      plans: BaseTable<Plan>;
      profiles: BaseTable<Profile>;
      subscriber_users: BaseTable<SubscriberUser>;
      subscribers: BaseTable<Subscriber>;
      subscriptions: BaseTable<Subscription>;
      system_settings: BaseTable<SystemSettings>;
      user_dashboard_metrics: BaseTable<UserDashboardMetrics>;
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
export type ConfigType = 'feature' | 'test' | 'appearance';
export type InvoiceStatus = 'draft' | 'created' | 'sent' | 'pending' | 'overdue' | 'cancelled' | 'paid';
export type InvoiceTemplateType = 'default' | 'simple' | 'detailed' | 'professional' | 'custom';
export type UserRole = 'superadmin' | 'admin' | 'user' | 'dependent';

export interface Enums {
  config_type: ConfigType;
  invoice_status: InvoiceStatus;
  invoice_template_type: InvoiceTemplateType;
  user_role: UserRole;
}
export type CommonTranslations = {
  status: {
    active: string;
    inactive: string;
  };
  actions: {
    edit: string;
    save: string;
    saving: string;
    cancel: string;
  };
};

export type NavigationTranslations = {
  records: string;
  services: string;
  user: string;
  customers: string;
  products: string;
  invoices: string;
  profile: string;
  company: string;
  plan: string;
  invoice_settings: string;
  admin: {
    subscribers: string;
    plans: string;
    integrations: string;
    reports: string;
    settings: string;
  };
  feedback: {
    submit: string;
    list: string;
  };
};

export type CompanyTranslations = {
  title: string;
  basic_info: string;
  contact: string;
  address: string;
  country: string;
  name: string;
  name_placeholder: string;
  display_tax_id: string;
  address_line1: string;
  address_line1_placeholder: string;
  address_line2: string;
  address_line2_placeholder: string;
  tax_info: string;
};

export type CustomersTranslations = {
  title: string;
  add: string;
  table: {
    empty: string;
    type: string;
    name: string;
    company_name: string;
    status: string;
    actions: string;
  };
  details: {
    status: {
      active: string;
      inactive: string;
    };
  };
};

export type ProductsTranslations = {
  title: string;
  add: string;
  table: {
    empty: string;
    name: string;
    type: string;
    price: string;
    stock: string;
    status: string;
    actions: string;
  };
  form: {
    price: string;
    sku: string;
  };
};

export type AdminTranslations = {
  subscribers: {
    title: string;
    no_company: string;
    no_owner: string;
    created_at: string;
    users_count: string;
    manage_users: string;
    users: {
      title: string;
      no_users: string;
      role: string;
      email: string;
    };
  };
};

export interface Translations {
  common: CommonTranslations;
  navigation: NavigationTranslations;
  company: CompanyTranslations;
  customers: CustomersTranslations;
  products: ProductsTranslations;
  admin: AdminTranslations;
}
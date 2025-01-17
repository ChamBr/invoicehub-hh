export interface CommonTranslations {
  status: {
    active: string;
    inactive: string;
  };
  actions: {
    edit: string;
    save: string;
    saving: string;
    cancel: string;
    create: string;
    delete: string;
    confirm: string;
  };
}

export interface AdminTranslations {
  subscribers: {
    title: string;
    no_company: string;
    no_owner: string;
    created_at: string;
    users_count: string;
    manage_users: string;
    edit: string;
    users: {
      title: string;
      no_users: string;
      role: string;
      email: string;
    };
    status: {
      active: string;
      inactive: string;
    };
  };
}

export interface Translations {
  common: CommonTranslations;
  admin: AdminTranslations;
  // Adicione outros módulos conforme necessário
}
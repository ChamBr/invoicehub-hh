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
  // ... outras tabelas
}

export interface CompanyProfile {
  id: string;
  user_id: string;
  company_name: string | null;
  // ... outros campos
}

export interface CompanyProfileInsert {
  id?: string;
  user_id: string;
  company_name?: string | null;
  // ... outros campos
}

export interface CompanyProfileUpdate {
  id?: string;
  user_id?: string;
  company_name?: string | null;
  // ... outros campos
}

// ... outras interfaces
import { SupabaseClient } from '@supabase/supabase-js';
import { CompanyTables } from './company';
import { CustomerTables } from './customer';
import { InvoiceTables } from './invoice';
import { ProductTables } from './product';
import { SettingsTables } from './settings';
import { UserTables } from './user';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: CompanyTables & CustomerTables & InvoiceTables & ProductTables & SettingsTables & UserTables;
}

export type TypedSupabaseClient = SupabaseClient<Database>;
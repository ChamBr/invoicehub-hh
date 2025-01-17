import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from './database';
import { Tables } from './database/tables';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type TypedSupabaseClient = SupabaseClient<Database>;

export type Table<T extends keyof Tables> = Tables[T]['Row'];
export type TableInsert<T extends keyof Tables> = Tables[T]['Insert'];
export type TableUpdate<T extends keyof Tables> = Tables[T]['Update'];

export type { Tables };
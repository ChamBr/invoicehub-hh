import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://oidnjpzvqidxheegxhai.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pZG5qcHp2cWlkeGhlZWd4aGFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUzNDI0MDAsImV4cCI6MjAyMDkxODQwMH0.qPxeoXiMp1k6_5s70z52iXlI_LtizJEnGmhGRA9QnX0";

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce'
    }
  }
);
import { useState } from 'react';
import { Session } from '@supabase/supabase-js';

export const useAuthState = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  return {
    session,
    setSession,
    isLoading,
    setIsLoading
  };
};
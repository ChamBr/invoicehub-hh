import { useEffect } from 'react';
import { Session } from '@supabase/supabase-js';

export const useSessionCheck = (
  session: Session | null,
  checkSessionValidity: () => Promise<void>
) => {
  useEffect(() => {
    if (!session) return;

    const sessionCheck = setInterval(() => {
      checkSessionValidity();
    }, 5 * 60 * 1000); // Verifica a cada 5 minutos

    return () => clearInterval(sessionCheck);
  }, [session, checkSessionValidity]);
};
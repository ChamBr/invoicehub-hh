import { useEffect } from 'react';
import { Session } from '@supabase/supabase-js';

export const useSessionCheck = (
  session: Session | null,
  checkValidity: () => Promise<void>
) => {
  useEffect(() => {
    if (session?.refresh_token) {
      const interval = setInterval(async () => {
        await checkValidity();
      }, 4 * 60 * 1000); // Verifica a cada 4 minutos

      return () => clearInterval(interval);
    }
  }, [session, checkValidity]);
};
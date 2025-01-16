import { useEffect } from 'react';
import { Session } from '@supabase/supabase-js';

export const useSessionCheck = (
  session: Session | null,
  checkValidity: () => Promise<void>
) => {
  useEffect(() => {
    if (!session) return;

    const checkInterval = setInterval(() => {
      checkValidity();
    }, 4 * 60 * 1000); // Verifica a cada 4 minutos

    return () => clearInterval(checkInterval);
  }, [session, checkValidity]);
};
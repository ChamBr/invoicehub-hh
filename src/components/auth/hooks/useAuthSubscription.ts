import { useEffect } from 'react';
import { Session, AuthChangeEvent } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAuthSubscription = (
  setSession: (session: Session | null) => void,
  setIsLoading: (loading: boolean) => void
) => {
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, newSession) => {
      console.log('Estado de autenticação alterado:', event);
      
      switch (event) {
        case 'SIGNED_IN':
          if (newSession?.refresh_token) {
            setSession(newSession);
            toast({
              title: "Login realizado",
              description: "Bem-vindo ao sistema",
            });
          }
          break;
        
        case 'SIGNED_OUT':
          setSession(null);
          break;
        
        case 'TOKEN_REFRESHED':
          if (newSession?.refresh_token) {
            console.log('Token atualizado com sucesso');
            setSession(newSession);
          }
          break;
        
        case 'USER_UPDATED':
          if (newSession) {
            setSession(newSession);
          }
          break;
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setSession, setIsLoading, toast]);
};
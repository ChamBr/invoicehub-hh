import { useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export const useAuthSubscription = (
  setSession: (session: Session | null) => void,
  handleSessionEnd: (message: string) => void
) => {
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log('Auth state changed:', event);
        
        switch (event) {
          case "SIGNED_OUT":
            setSession(null);
            handleSessionEnd("Você foi desconectado.");
            break;
          
          case "SIGNED_IN":
            if (newSession) {
              setSession(newSession);
              toast({
                title: "Login realizado",
                description: "Bem-vindo ao sistema",
              });
            }
            break;
          
          case "TOKEN_REFRESHED":
            if (newSession) {
              console.log("Token atualizado com sucesso");
              setSession(newSession);
            }
            break;
          
          default:
            break;
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [setSession, handleSessionEnd, toast]);
};
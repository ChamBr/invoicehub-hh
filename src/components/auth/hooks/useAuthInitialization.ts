
import { useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAuthInitialization = (
  setSession: (session: Session | null) => void,
  setIsLoading: (loading: boolean) => void,
  clearSession: () => Promise<void>
) => {
  const { toast } = useToast();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Erro ao recuperar sessão:', error);
          toast({
            title: "Erro de autenticação",
            description: "Não foi possível recuperar sua sessão",
            variant: "destructive",
          });
          await clearSession();
          return;
        }

        if (currentSession?.refresh_token) {
          console.log('Sessão existente encontrada');
          setSession(currentSession);
        } else {
          console.log('Nenhuma sessão válida encontrada');
          await clearSession();
        }
      } catch (error) {
        console.error('Erro ao inicializar autenticação:', error);
        toast({
          title: "Erro de inicialização",
          description: "Ocorreu um erro ao inicializar a autenticação",
          variant: "destructive",
        });
        await clearSession();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [setSession, setIsLoading, clearSession, toast]);
};

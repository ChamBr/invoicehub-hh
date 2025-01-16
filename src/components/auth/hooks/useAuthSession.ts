import { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

export const useAuthSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleError = (error: Error) => {
    console.error('Erro de autenticação:', error);
    toast({
      title: "Erro de autenticação",
      description: "Ocorreu um erro ao verificar sua sessão",
      variant: "destructive",
    });
  };

  const initializeAuth = async () => {
    try {
      const { data: { session: currentSession }, error } = await supabase.auth.getSession();
      
      if (error) {
        handleError(error);
        return;
      }

      setSession(currentSession);
      
      if (!currentSession) {
        console.log("Nenhuma sessão encontrada");
        navigate('/login');
      }
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    session,
    setSession,
    isLoading,
    setIsLoading,
    initializeAuth,
    handleError
  };
};
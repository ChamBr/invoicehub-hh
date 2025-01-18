import { createContext, useContext, useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useSessionManagement } from "@/hooks/use-session";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  session: Session | null;
  isLoading: boolean;
  clearSession: () => void;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  isLoading: true,
  clearSession: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { checkSessionValidity } = useSessionManagement(session, setSession);

  const clearSession = async () => {
    try {
      await supabase.auth.signOut();
      setSession(null);
      localStorage.removeItem('supabase.auth.token');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      toast({
        title: "Erro ao fazer logout",
        description: "Ocorreu um erro ao tentar desconectar sua conta",
        variant: "destructive",
      });
    }
  };

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
          return;
        }

        if (currentSession?.refresh_token) {
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
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
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

        case 'USER_DELETED':
          await clearSession();
          break;
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  useEffect(() => {
    if (session?.refresh_token) {
      const interval = setInterval(async () => {
        await checkSessionValidity();
      }, 4 * 60 * 1000); // Verifica a cada 4 minutos

      return () => clearInterval(interval);
    }
  }, [session, checkSessionValidity]);

  return (
    <AuthContext.Provider value={{ session, isLoading, clearSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;